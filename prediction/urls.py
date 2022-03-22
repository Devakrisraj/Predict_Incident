from django.urls import path
from django.conf.urls import url
from django.conf import settings
from django.contrib import admin
from django.conf.urls.static import static
from . import views
#urlpatterns = [
#   url(r'^admin/', admin.site.urls),
 #  path("",views.home,name='home'),
# ]
#if settings.DEBUG:
#  urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
#urlpatterns = [path('register/', views.registerPage, name="register"),
 #       path('login/', views.loginPage, name="login"),
  #      path('logout/', views.logoutUser, name="logout"),
   #     path("",views.home, name='home'),
    #    url(r'^predanlys', views.predanlys,name="predanlys"),
     #   url(r'^prediction',views.prediction, name="prediction"),
      #  url(r'^dashboard', views.dashboard,name="dashboard")
       # ]

urlpatterns = [path("",views.predanlys,name="predanlys"),
        url(r'^prediction',views.prediction, name="prediction"),
        url(r'^accuracy',views.accuracy, name="accuracy"),
        url(r'^dashboard', views.dashboard,name="dashboard")
        ]

if settings.DEBUG:
   urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)