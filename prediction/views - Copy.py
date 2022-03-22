from django.shortcuts import render, redirect
from django.http import HttpResponse
import requests
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
import matplotlib.pyplot as plt
import io
import urllib, base64
from django.forms import inlineformset_factory
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .models import *
from .forms import OrderForm, CreateUserForm
#from django.core.files.storage import default_storage
#import wikipedia
#import requests
#def registerPage(request):
#    if request.user.is_authenticated:
#        return redirect('home')
#    else:
#        form = CreateUserForm()
#        if request.method == 'POST':
#            form = CreateUserForm(request.POST)
#            if form.is_valid():
#                form.save()
#                user = form.cleaned_data.get('username')
#                messages.success(request, 'Account was created for ' + user)

#                return redirect('login')

#        context = {'form': form}
#        return render(request, 'register.html', context)

#def loginPage(request):
#    if request.user.is_authenticated:
#        return redirect('home')
#    else:
#        if request.method == 'POST':
#            username = request.POST.get('username')
#            password = request.POST.get('password')

#            user = authenticate(request, username=username, password=password)

#            if user is not None:
#                login(request, user)
#                return redirect('home')
#            else:
#                messages.info(request, 'Username OR password is incorrect')

#        context = {}
#        return render(request, 'login.html', context)


#def logoutUser(request):
#def logoutUser(request):
#    logout(request)
#    return redirect('login')
#    return render(request, 'login')

#@login_required(login_url='login')
#def home(request):
#    return render(request,'Home.html')

#@login_required(login_url='login')
def dashboard(request):
#    NIR = '600'
    return render(request,'Dashboard.html')

#@login_required(login_url='login')
def predanlys(request):
    return render(request,'Predict_Index.html')

#@login_required(login_url='login')
def prediction(request):
    print ('Prediction-Inside')
    par = request.POST.get('Prediction Area') 
    pal = request.POST.get('Prediction Application') 
    if request.method == 'POST' and request.FILES['transfile']:
        print ('aft-post')
        transfile = request.FILES.get('transfile')
#        file2 = request.FILES.get('file2')
        print ('transfile= ',transfile)
        fs = FileSystemStorage()
        filename1 = fs.save(transfile.name, transfile)
#        filename2 = fs.save(file2.name, file2)
        uploaded_file_url = fs.url(filename1)
#        print ('filename1= ',filename1)
        import cv2
        import os
        base_dir =settings.MEDIA_ROOT
        print('Base_Dir: ', base_dir)
        xlsx_file1 = os.path.join(base_dir, str(transfile))
        
        import numpy as np
        import pandas as pd
        from pandas import ExcelWriter
        from pandas import ExcelFile
        import seaborn as sns
        from sklearn.model_selection import train_test_split
        from sklearn.preprocessing import OneHotEncoder
        from sklearn.preprocessing import LabelEncoder
        from datetime import datetime
        import matplotlib.pyplot as plt
        import warnings
        warnings.filterwarnings('ignore')
          
        Predara = pd.DataFrame(columns=['Acrnonym'])
        Predara.loc[1, 'Acrnonym'] = pal
        Predara.to_json('static/Predarea.json', orient='table', index=False)
#
        df = pd.read_excel(xlsx_file1, parse_dates=['Submit Date'])
#        
        df1 = df[[ "CI+", "Urgency*", "Submit Date", "Status*"]]
        df1.rename(columns = {'CI+':'Applications', 'Status*':'Status', 'Urgency*':'Priority'}, inplace = True)
        df1 = df1.dropna(subset=['Applications'])
        df1['Month'] = df1['Submit Date'].dt.strftime('%Y-%m')
        cnt = pd.DataFrame(columns=['Title', 'Count'])
        cnt.loc[1, 'Title'] = 'Incident Count'
        cnt.loc[1, 'Count'] = (df1[(df1['Month'] > '2020-12')]['Status'].count())
#
        cnt.loc[2, 'Title'] = 'Inprogress Count'
        inprogress = ['Assigned','In Progress','Pending','Resolved']
        cnt.loc[2, 'Count'] = (df1[(df1['Month'] > '2020-12') & (df1['Status'].isin(inprogress))]['Status'].count())
#
        cnt.loc[3, 'Title'] = 'Closed Count'
        cnt.loc[3, 'Count'] = (df1[(df1['Month'] > '2020-12') & (df1['Status'] == 'Closed')]['Status'].count())
        ttlcnt = (df1[(df1['Month'] > '2020-12')]['Status'].count())
        
#        inprogress = ['Assigned','In Progress','Pending','Resolved']
        inprgcnt = (df1[(df1['Month'] > '2020-12') & (df1['Status'].isin(inprogress))]['Status'].count())
        csdcnt = (df1[(df1['Month'] > '2020-12') & (df1['Status'] == 'Closed')]['Status'].count())
        dfcnt = df1.groupby(['Applications','Month']).Applications.agg('count').to_frame('Incident_Counts').reset_index()
        options = ['Unit Linked Pensions','Unit Linked Life','Annuity Payments (APOLLO)','Climate (Conventional Life)','HPS CKB']
        cntyr = dfcnt[(dfcnt['Month'] > '2020-12') &
              dfcnt['Applications'].isin(options)]
        dfscnt = df1.groupby(['Applications','Month', 'Status']).Applications.agg('count').to_frame('Incident_Counts').reset_index()
        scntyr = dfscnt[dfscnt['Month'] > '2020-12']
        prdf = df1.groupby(['Priority','Applications','Month']).Priority.agg('count').to_frame('Incident_Counts').reset_index()
        prdfcurr = prdf[prdf['Month'] > '2020-12']
#       
        cnt.to_json('static/cnt_list.json', orient='table', index=False)
        cntyr.to_json('static/cnt_year.json', orient='table', index=False)
        scntyr.to_json('static/sts_cnt_year.json', orient='table', index=False)
        prdfcurr.to_json('static/prty_cnt_year.json', orient='table', index=False)
#        
        df = df[[ "CI+", "Submit Date"]]
        df['Month'] = df['Submit Date'].dt.strftime('%Y-%m')
        df.rename(columns = {'CI+':'Applications','Submit Date': 'Date'}, inplace = True)
        
        sdf = df.groupby(['Month', 'Applications']).agg({"Applications": {"Count": "count"}})
        ulpdf=sdf.xs(pal, level='Applications')
        dist_ulpdf = ulpdf.reset_index(level=[0])
        dist_ulpdf.columns =['Month', 'Incident_Counts']
        dist_ulpdf['Month']= pd.to_datetime(dist_ulpdf['Month'])
        dist_ulpdf = dist_ulpdf.set_index('Month')
        import statsmodels.api as sm
        decomposition = sm.tsa.seasonal_decompose(dist_ulpdf, freq=5, model='additive')
        fig = decomposition.plot()
        fig.savefig('static/images/decompose.png')
#    fig.show()
        from statsmodels.tsa.arima_model import ARIMA
        final_model=ARIMA(dist_ulpdf,order=(5,0,2)).fit()
        prediction=final_model.predict(len(dist_ulpdf),len(dist_ulpdf)+6)
        dist_ulpdf.plot(legend=True, label='Train', figsize=(15,6))
        prediction.plot(legend=True, label='prediction')
        fig1 = plt.gcf()
        fig1.savefig('static/images/series.png')
#    dist_ulpdf.plot(legend=True, label='Train', figsize=(10,6))
#    prediction.plot(legend=True, label='prediction')    
        predres = pd.DataFrame(prediction).reset_index()
        predres.columns =['Month', 'Incident_Counts']
        predres['Incident_Counts'] = predres['Incident_Counts'].round(0)
        print ('predres= ', predres.head(6))
        predcurr = predres[predres['Month'] > '2020-12-01']
        predcurr['Month'] = predcurr['Month'].dt.strftime('%Y-%m')
#        predcurr.style.set_caption("Prediction Count for ULP")
        predcurr.to_json('static/pred_cnt.json', orient='table', index=False)
        print ('pred_cnt.json')
#        html = predres.to_html(index=False,classes='mystyle')
#        ax = sns.barplot(x = "Month", y = "Incident_Counts", data = predres).set(title="Prediction Results")
#        fig=plt.show()
#        fig = plt.gcf()
#        barchart = fig + ".png"
#        fs = FileSystemStorage()
#       fs.save(png_file.name, png_file)
#        os.path.join(base_dir, str(barchart.png))
#       fig.savefig('static/images/barchart.png')
        return render(request, 'Dashboard.html')
#        return render(request, 'Dashboard.html', {'ttlcnt': ttlcnt,'inprgcnt': inprgcnt,'csdcnt': csdcnt})
#        return render(request, 'Prediction_Out.html', {'table': html})
#        return render(request, 'Prediction_Out.html')
#        buf = io.BytesIO()
#        fig.savefig(buf,format='png')
#        buf.seek(0)
#        imsrc = base64.b64encode(buf.read())
#        imuri = 'data:image/png;base64,{}'.format(urllib.parse.quote(imsrc))
#        context = { 'plot': imuri}
#        template = get_template('Predict_Index.html')
#        html1 = template.render(context=context)
#         return render(request, 'Predict_Index.html')        
#        uri = urllib.parse.quote(string)
#        context['graph'] = fig()
#        return render(request, 'Predict_Index.html',{'data':uri})
#        figure = plt.gcf()
#        canvas = FigureCanvas(fig)
#        response = HttpResponse(content_type='image/png')
#        graph_div = plotly.offline.plot(fig, auto_open = False, output_type="div")
        
def accuracy(request):
    return render(request,'Accuracy.html')