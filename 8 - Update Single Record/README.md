# Update Document using UpdateOne

```
db.students.updateOne({name:"John Doe"}, {age:15})
```

```
MongoInvalidArgumentError: Update document requires atomic operators
```

```
db.students.updateOne({name:"John Doe"}, { $set: {age:15} })
```