
# **EduPathways Web Application Deployment on AWS**

## **Project Overview**

This project involves deploying a static web application built using **HTML**, **CSS**, **JavaScript**, and **Vite** to AWS. The web app is hosted on an S3 bucket, distributed globally using CloudFront, and monitored with CloudWatch.

### **Deployed URL**
The live site is available at: [edupathways.cloudevopsnow.com](https://edupathways.cloudevopsnow.com)

---

## **Table of Contents**
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Deployment Steps](#deployment-steps)
  - [1. Building the Project](#1-building-the-project)
  - [2. Configuring S3 Bucket for Static Hosting](#2-configuring-s3-bucket-for-static-hosting)
  - [3. Setting Up CloudFront](#3-setting-up-cloudfront)
  - [4. Connecting CloudFront with Route 53](#4-connecting-cloudfront-with-route-53)
  - [5. Implementing CloudWatch Logs](#5-implementing-cloudwatch-logs)
- [Common Errors and Fixes](#common-errors-and-fixes)
- [Future Enhancements](#future-enhancements)

---

## **Tech Stack**
- **Frontend:** HTML, CSS, JavaScript, Vite
- **AWS Services:** S3, CloudFront, Route 53, CloudWatch, Lambda
- **Deployment:** Amazon S3 (Static Web Hosting), CloudFront (CDN)
- **Monitoring:** AWS CloudWatch

---

## **Prerequisites**
To deploy this project, you will need:
- AWS Account
- Domain name (optional, but recommended)
- Basic knowledge of AWS services like S3, CloudFront, and Route 53

---

## **Deployment Steps**

### **1. Building the Project**
Before deploying, we need to build the project using **Vite** to generate optimized production files.

```bash
npm run build
```

This will create a `dist/` folder containing the production-ready files.

### **2. Configuring S3 Bucket for Static Hosting**

1. **Create an S3 Bucket**:
   - Go to AWS S3 Console and create a new bucket (e.g., `edupathways-servathon`).
   - Uncheck **Block all public access** since the site should be accessible.

2. **Upload Files**:
   - Upload the contents of the `dist/` folder into the S3 bucket.

3. **Enable Static Website Hosting**:
   - In the S3 console, go to **Properties** → **Static Website Hosting** and enable it.
   - Set the index document to `index.html`.

4. **Set Permissions**:
   - Modify the bucket policy to allow public read access:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::edupathways-servathon/*"
    }
  ]
}
```

### **3. Setting Up CloudFront**

1. **Create a CloudFront Distribution**:
   - In the CloudFront Console, create a distribution and select the S3 bucket as the origin.
   - Set the **Viewer Protocol Policy** to `Redirect HTTP to HTTPS`.

2. **Add CNAME (Optional)**:
   - If you are using a custom domain (e.g., `edupathways.cloudevopsnow.com`), add it in the **Alternate Domain Names (CNAMEs)** section.

3. **Set SSL Certificate**:
   - Use AWS Certificate Manager (ACM) to request an SSL certificate and attach it to your CloudFront distribution.

### **4. Connecting CloudFront with Route 53**

1. **Go to Route 53 Console**:
   - Open the hosted zone for your domain (e.g., `cloudevopsnow.com`).
   
2. **Create an A Record**:
   - Select **A Record** and set the target to the CloudFront distribution.

Now, your website will be accessible via your custom domain.

### **5. Implementing CloudWatch Logs**

1. **Enable CloudFront Logging**:
   - In the CloudFront settings, enable logging and choose an S3 bucket for storing logs.

2. **Set Up CloudWatch**:
   - Create a CloudWatch log group (e.g., `edupathways-servathon`) for storing and monitoring logs.

3. **Lambda Function for Processing Logs**:
   - Deploy a Lambda function to process CloudFront logs and push them to CloudWatch. The function will read logs from the S3 bucket and send them to the log group.

Here’s a sample Lambda function:

```python
import gzip
import json
import boto3

s3_client = boto3.client('s3')
cloudwatch_client = boto3.client('logs')

log_group_name = 'edupathways-servathon'

def lambda_handler(event, context):
    for record in event['Records']:
        bucket = record['s3']['bucket']['name']
        key = record['s3']['object']['key']
        
        response = s3_client.get_object(Bucket=bucket, Key=key)
        compressed_log_data = response['Body'].read()
        
        log_data = gzip.decompress(compressed_log_data).decode('utf-8')
        log_lines = log_data.splitlines()
        
        log_stream_name = key.replace("/", "-")
        
        try:
            cloudwatch_client.create_log_stream(
                logGroupName=log_group_name,
                logStreamName=log_stream_name
            )
        except cloudwatch_client.exceptions.ResourceAlreadyExistsException:
            pass
        
        log_events = [{'timestamp': int(event['eventTime'] * 1000), 'message': line} for line in log_lines]
        
        cloudwatch_client.put_log_events(
            logGroupName=log_group_name,
            logStreamName=log_stream_name,
            logEvents=log_events
        )
```

---

## **Common Errors and Fixes**

### **Error 1: CloudFront Distribution Not Linked to Route 53**
- **Issue**: After creating a CloudFront distribution, I encountered a `DNS_PROBE_FINISHED_NXDOMAIN` error.
- **Fix**: This occurred because the Route 53 **A Record** was not set to point to the CloudFront distribution. To fix this, I created an A Record pointing to the distribution.

### **Error 2: Lambda Function Failing with KeyError**
- **Issue**: The Lambda function failed with a `KeyError: 'Records'` due to an invalid event structure.
- **Fix**: Ensured that the correct S3 event structure was passed when triggering the Lambda function.

---

## **Future Enhancements**

- **Authentication**: Implement user authentication with AWS Cognito.
- **Caching**: Optimize CloudFront caching settings for improved performance.
- **CI/CD**: Automate deployment using AWS CodePipeline or GitHub Actions.
- **Monitoring**: Add more advanced monitoring using AWS CloudWatch Metrics and Alarms.

---

## **Contact**

For any issues or suggestions, feel free to reach out to me at:  
**Name**: Madhur  
**Email**: madhur.cloudevops@gmail.com

---

That’s it! Your static web application is now successfully deployed on AWS using S3, CloudFront, and CloudWatch. Enjoy! 😊

---

