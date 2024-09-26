# MongoDB-Essential-Training
 
# Select All Records

```
db.students.find()
```

# Insert Single Record

```
db.students.insert({name:"John Doe", age:12});
```

```
DeprecationWarning: Collection.insert() is deprecated. Use insertOne, insertMany, or bulkWrite.
```

```
db.category.insertOne({"name": "a"})
```

```
db.category.insertOne({"name": "b"})
```

```
db.category.insertOne({"name": "c"})
```

```
db.category.insertOne({"name": "d"})
```


# Insert Many Records

```
db.category.insertMany([
  {"name": "a"},
  {"name": "b"},
  {"name": "c"},
  {"name": "d"}
])
```

```
db.students.insertMany({name:"John Doe", age:12});
```

```
db.students.bulkWrite({name:"John Doe", age:12});
```