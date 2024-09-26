# Delete Document using DeleteMany

```
db.students.deleteMany({})
```

```
db.students.deleteMany()
```

```
MongoshInvalidInputError: [COMMON-10001] Missing required argument at position 0 (Collection.deleteMany)
```

```
db.students.deleteMany({age:13})
```