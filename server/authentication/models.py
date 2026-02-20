from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class UserManager(BaseUserManager):
    def create_user(self, uname, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        if not uname:
            raise ValueError('The Username field must be set')
        
        email = self.normalize_email(email)
        user = self.model(uname=uname, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, uname, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(uname, email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    uid = models.AutoField(primary_key=True)
    uname = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = 'uname'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.uname
