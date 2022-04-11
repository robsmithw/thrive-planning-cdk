import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_cognito as cognito } from 'aws-cdk-lib';
import { aws_ses as ses } from 'aws-cdk-lib';
import { VerifySesEmailAddress } from '@seeebiii/ses-verify-identities'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

let thrivPlanUserPoolName: string = 'ThrivPlanUsers'
let thrivPlanEmail: string = 'thrivplan@gmail.com'

export class ThrivePlanningCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new VerifySesEmailAddress(this, 'SesEmailVerification', {
      emailAddress: thrivPlanEmail
    });

    new cognito.UserPool(this, thrivPlanUserPoolName, 
      {
        userPoolName: thrivPlanUserPoolName,
        selfSignUpEnabled: false,
        signInAliases: {
          username: true
        },
        signInCaseSensitive: false,
        standardAttributes: {
          email: {
            required: true
          }
        },
        email: cognito.UserPoolEmail.withSES({
          sesRegion: 'us-west-1',
          fromEmail: thrivPlanEmail,
          fromName: 'Thriv Plan'
        })
      }
    );
  }
}
