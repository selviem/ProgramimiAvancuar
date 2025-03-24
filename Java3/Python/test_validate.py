import unittest
from validate import validate_user_data

class TestValidateUserData(unittest.TestCase):

    def test_valid_data(self):
        user_data = {
            "username": "valid_user1",
            "email": "user@example.com",
            "password": "Password123!",
            "age": 25,
            "referral_code": "ABCDEFGH"
        }
        result = validate_user_data(user_data)
        self.assertTrue(result["is_valid"])
        self.assertEqual(result["errors"], {})

    def test_missing_username(self):
        user_data = {
            "email": "user@example.com",
            "password": "Password123!",
            "age": 25
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertIn("username", result["errors"])

    def test_invalid_email_format(self):
        user_data = {
            "username": "valid_user1",
            "email": "invalidemail.com",
            "password": "Password123!",
            "age": 25
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertEqual(result["errors"]["email"], "Invalid email format")

    def test_password_too_short(self):
        user_data = {
            "username": "valid_user1",
            "email": "user@example.com",
            "password": "short",
            "age": 25
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertEqual(result["errors"]["password"], "Password must be at least 8 characters long")

    def test_missing_age(self):
        user_data = {
            "username": "valid_user1",
            "email": "user@example.com",
            "password": "Password123!"
        }
        result = validate_user_data(user_data)
        self.assertTrue(result["is_valid"])  # Age is optional

    def test_underage(self):
        user_data = {
            "username": "valid_user1",
            "email": "user@example.com",
            "password": "Password123!",
            "age": 17
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertEqual(result["errors"]["age"], "User must be at least 18 years old")

    def test_invalid_referral_code(self):
        user_data = {
            "username": "valid_user1",
            "email": "user@example.com",
            "password": "Password123!",
            "referral_code": "short"
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertEqual(result["errors"]["referral_code"], "Referral code must be exactly 8 characters")

if __name__ == '__main__':
    unittest.main()
