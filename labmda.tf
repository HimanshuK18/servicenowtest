# Configure the AWS provider
provider "aws" {
  region = "ap-southeast-2"
}

# Create an AWS Lambda function
resource "aws_lambda_function" "nodejs_function" {
  function_name = "nodejs_function"
  role         = aws_iam_role.lambda_role.arn
  handler      = "index.handler"
  runtime      = "nodejs14.x"
  filename     = "nodejs_function.zip"
  source_code_hash = filebase64sha256("nodejs_function.zip")
}

# Create an IAM Role for the Lambda Function
resource "aws_iam_role" "lambda_role" {
  name = "lambda_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# Attach a policy to the IAM Role
resource "aws_iam_role_policy_attachment" "lambda_policy" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  role       = aws_iam_role.lambda_role.name
}

# Create a Lambda deployment package
data "archive_file" "nodejs_function_zip" {
  type        = "zip"
  source_dir  = "path/to/nodejs/function"
  output_path = "nodejs_function.zip"
}

# Create an AWS API Gateway REST API
resource "aws_api_gateway_rest_api" "nodejs_api" {
  name = "nodejs_api"
}

# Create an AWS API Gateway Resource
resource "aws_api_gateway_resource" "nodejs_resource" {
  rest_api_id = aws_api_gateway_rest_api.nodejs_api.id
  parent_id   = aws_api_gateway_rest_api.nodejs_api.root_resource_id
  path_part   = "{proxy+}"
}

# Create an AWS API Gateway Method
resource "aws_api_gateway_method" "nodejs_method" {
  rest_api_id   = aws_api_gateway_rest_api.nodejs_api.id
  resource_id   = aws_api_gateway_resource.nodejs_resource.id
  http_method   = "ANY"
  authorization = "NONE"
}

# Create an AWS API Gateway Integration
resource "aws_api_gateway_integration" "nodejs_integration" {
  rest_api_id = aws_api_gateway_rest_api.nodejs_api.id
  resource_id = aws_api_gateway_resource.nodejs_resource.id
  http_method = aws_api_gateway_method.nodejs_method.http_method
  integration_http_method = "POST"
  type        = "AWS_PROXY"
  uri         = aws_lambda_function.nodejs_function.invoke_arn
}

# Create an AWS API Gateway Deployment
resource "aws_api_gateway_deployment" "nodejs_deployment" {
  rest_api_id = aws_api_gateway_rest_api.nodejs_api.id
  stage_name  = "prod"
}
