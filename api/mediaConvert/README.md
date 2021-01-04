## AWS Video on Demand w/ Elemental MediaConvert

For this hackathon, AWS's template solution for [video streaming + processing](https://docs.aws.amazon.com/solutions/latest/video-on-demand/template.html) was deployed in a separate stack alongside the retrieval API contained in this repo.
The cloudformation template used in included for reference, although it *is not included in the `serverless` deployment*.  The template was modified to include an additional GSI on the Dynamo table to support querying rows by an associated person identifier (specified as `mediaOwnerId` in the template file). This additional index is leveraged by the `getEncouragement` endpoint.

In the hackathon deployment, this id and index is `beneficiaryId`, reflecting the use of the field to mark video rows for beneficiary introduction videos. The same concept could be applied for an encourager, FCP, or any other association needed.

### AWS References:
https://docs.aws.amazon.com/solutions/latest/video-on-demand/architecture.html
