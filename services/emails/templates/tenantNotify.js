function tenant_notify_email({title, description, buildingName}) {
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VLOOKIN OTP</title>
  <style>
    body {
      font-family: Arial, sans-serif;
    }
    .container {
      max-width: 500px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ccc;
    }
    h1 {
      font-size: 24px;
      margin-bottom: 20px;
    }
    p {
      margin-bottom: 10px;
    }
    .otp-code {
      font-size: 20px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>VLOOKIN</h1>
    <p>Hello,</p>
    <p>${title}</p>
    <p class="otp-code">${description}</p>
    <p class="otp-code">${buildingName}</p>
    <p>Regards,<br>VLooking Properties</p>
  </div>
</body>
</html>
`;
    return html
}


module.exports = {
    tenant_notify_email
}