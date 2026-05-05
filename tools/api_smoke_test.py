import json
import urllib.error
import urllib.request

BASE_URL = "http://127.0.0.1:8080/api"


def post(path, payload):
    data = json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(
        f"{BASE_URL}{path}",
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=8) as response:
        return json.loads(response.read().decode("utf-8"))


def get(path):
    with urllib.request.urlopen(f"{BASE_URL}{path}", timeout=8) as response:
        return json.loads(response.read().decode("utf-8"))


def main():
    try:
        admin = post(
            "/auth/login",
            {"email": "admin@shieldher.local", "password": "Admin@123"},
        )
        profiles = get(f"/profiles?requesterId={admin['id']}")
        print("Backend is running.")
        print(f"Logged in as: {admin['name']} ({admin['role']})")
        print(f"Visible user profiles: {len(profiles)}")
    except urllib.error.URLError as error:
        print("Could not reach the backend. Start Spring Boot on port 8080 first.")
        print(error)


if __name__ == "__main__":
    main()
