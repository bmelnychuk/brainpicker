The process of building this project is covered in my articles:

- [Practicing Domain Driven Design. Part 1: Understanding the problem.](https://medium.com/@bmelnychuk/practicing-domain-driven-design-part-1-understanding-the-problem-ce8b57e7c769)
- [Practicing Domain Driven Design. Part 2: Dividing the problem.](https://medium.com/@bmelnychuk/practicing-domain-driven-design-part-2-dividing-the-problem-2d00d0b0fbea)

To run the project locally you need to integrate with the firebase. You can read about it [here](https://firebase.google.com/docs/functions/config-env#automatically_populated_environment_variables)

The easiest would be to create `firebase-config-dev.json` in the root folder with the following structure:  

 

```javascript
{  
	"databaseURL": "YOUR_DATABASE_URL"
	"storageBucket": "YOUR_STORAGE_BUCKET"
	"projectId": "PROJECT_ID"
}
```


To deploy the project to firebase functions double check `script/firebase` folder and make sure you have all required files and fields there.

To integrate with alexa or dialogflow you need to create new alexa or dialogflow app and import schema from `schema` folder.
