"""Backend tests for Zen Marinero API"""
import os
import io
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/") or "https://comedor-cerca.preview.emergentagent.com"
API = f"{BASE_URL}/api"
ADMIN_TOKEN = "zenmarinero2026"


@pytest.fixture
def s():
    return requests.Session()


# Health
def test_root_ok(s):
    r = s.get(f"{API}/")
    assert r.status_code == 200
    data = r.json()
    assert data.get("status") == "ok"


# Reservations
def test_create_reservation_and_list(s):
    payload = {
        "name": "TEST_Resv",
        "email": "test_resv@example.com",
        "phone": "+34622442301",
        "date": "2026-02-15",
        "time": "20:30",
        "guests": 2,
        "notes": "ventana"
    }
    r = s.post(f"{API}/reservations", json=payload)
    assert r.status_code == 200, r.text
    d = r.json()
    assert d["id"] and d["name"] == payload["name"]
    assert d["status"] == "pending"
    assert d["guests"] == 2

    # list via admin
    r2 = s.get(f"{API}/admin/reservations", headers={"Authorization": f"Bearer {ADMIN_TOKEN}"})
    assert r2.status_code == 200
    ids = [x["id"] for x in r2.json()]
    assert d["id"] in ids


def test_reservation_invalid_email(s):
    r = s.post(f"{API}/reservations", json={
        "name": "x", "email": "not-an-email", "phone": "1",
        "date": "2026-02-15", "time": "20:30", "guests": 2
    })
    assert r.status_code == 422


# Contact
def test_create_contact(s):
    payload = {"name": "TEST_Contact", "email": "tc@example.com", "phone": "123", "message": "hola"}
    r = s.post(f"{API}/contact", json=payload)
    assert r.status_code == 200, r.text
    d = r.json()
    assert d["id"] and d["message"] == "hola"

    r2 = s.get(f"{API}/admin/contacts", headers={"Authorization": f"Bearer {ADMIN_TOKEN}"})
    assert r2.status_code == 200
    assert any(x["id"] == d["id"] for x in r2.json())


# Jobs
def test_create_job_with_cv_and_download(s):
    files = {"cv": ("test_cv.pdf", io.BytesIO(b"%PDF-1.4 fake"), "application/pdf")}
    data = {"name": "TEST_Job", "email": "tj@example.com", "phone": "1", "message": "candidato"}
    r = s.post(f"{API}/jobs", data=data, files=files)
    assert r.status_code == 200, r.text
    d = r.json()
    assert d["id"] and d["cv_filename"]
    job_id = d["id"]

    # admin list
    r2 = s.get(f"{API}/admin/jobs", headers={"Authorization": f"Bearer {ADMIN_TOKEN}"})
    assert r2.status_code == 200
    assert any(x["id"] == job_id for x in r2.json())

    # download CV
    r3 = s.get(f"{API}/admin/jobs/{job_id}/cv", headers={"Authorization": f"Bearer {ADMIN_TOKEN}"})
    assert r3.status_code == 200
    assert b"PDF" in r3.content


def test_create_job_without_cv(s):
    data = {"name": "TEST_JobNoCV", "email": "tj2@example.com", "phone": "1", "message": "sin cv"}
    r = s.post(f"{API}/jobs", data=data)
    assert r.status_code == 200, r.text
    d = r.json()
    assert d["cv_filename"] is None


# Admin auth
def test_admin_requires_token(s):
    for path in ["/admin/reservations", "/admin/contacts", "/admin/jobs"]:
        r = s.get(f"{API}{path}")
        assert r.status_code == 401, path

    r = s.get(f"{API}/admin/reservations", headers={"Authorization": "Bearer wrong"})
    assert r.status_code == 401


def test_admin_verify(s):
    r = s.post(f"{API}/admin/verify", headers={"Authorization": f"Bearer {ADMIN_TOKEN}"})
    assert r.status_code == 200
    assert r.json() == {"ok": True}

    r2 = s.post(f"{API}/admin/verify")
    assert r2.status_code == 401
