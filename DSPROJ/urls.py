from django.contrib import admin
from django.urls import path, include
from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('prediction.urls'))
]

# path('admin/', admin.site.urls),