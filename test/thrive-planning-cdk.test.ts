import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as ThrivePlanningCdk from '../lib/thrive-planning-cdk-stack';

test('User Pool Created', () => {
  const app = new cdk.App();
    // WHEN
  const stack = new ThrivePlanningCdk.ThrivePlanningCdkStack(app, 'MyTestStack');
    // THEN
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::Cognito::UserPool', {
    UserPoolName: 'ThrivPlanUsers'
  });
});
