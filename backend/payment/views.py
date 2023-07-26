import json
import razorpay
from django.utils import timezone
from rest_framework.permissions import IsAuthenticated

from backend.settings import RAZOR_KEY_ID,RAZOR_KEY_SECRET
from account.models import CustomUser
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response

# Create your views here.

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def start_payment(request):

    amount=10000
    client =  razorpay.Client(auth=(RAZOR_KEY_ID,RAZOR_KEY_SECRET))
    payment = client.order.create({"amount": amount, 
                                   "currency": "INR"
                                   })
    data = {
        "payment": payment
    }
    return Response(data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def handle_payment_success(request):
    try:

            user=request.user
            res = json.loads(request.data["response"])
            print(res)
            ord_id = ""
            raz_pay_id = ""
            raz_signature = ""
            for key in res.keys():
                if key == 'razorpay_order_id':
                    ord_id = res[key]
                elif key == 'razorpay_payment_id':
                    raz_pay_id = res[key]
                elif key == 'razorpay_signature':
                    raz_signature = res[key]

            data = {
                'razorpay_order_id': ord_id,
                'razorpay_payment_id': raz_pay_id,
                'razorpay_signature': raz_signature
            }

            client =  razorpay.Client(auth=(RAZOR_KEY_ID,RAZOR_KEY_SECRET))
            
        
            check = client.utility.verify_payment_signature(data)
            

            if not check:
                    print("Redirect to error url or error page")
                    return Response({'error': 'Something went wrong'})
            try:

            
                user.has_premium = True

                user.premium_expiry = timezone.now() + timezone.timedelta(days=30)             
                user.save()
                return Response({'message':"User is now a premium subscriber",'status':200,})
            except Exception as e:
                return Response({'message':"Error updating user premium status:",'error': str(e)})
    except Exception as e:
         return Response({'error':str(e)})
            
            