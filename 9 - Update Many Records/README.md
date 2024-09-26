# Update Document using UpdateMany

```
db.students.updateMany({age:12}, { $set: {age:13} })
```

```
db.students.updateMany({age:12}, { $set: {isEligible:false} })
```

```
db.students.updateMany({age:13}, { $set: {isEligible:true} })
```

```
db.students.updateMany({ age:{$gte:14} }, { $set: {isEligible:true} })
```