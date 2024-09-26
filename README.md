# MongoDB-Essential-Training
 
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
db.students.insertMany([
  { name: "John Doe", age: 12, grade: "7th" },
  { name: "Jane Smith", age: 13, grade: "8th" },
  { name: "Sam Brown", age: 12, grade: "7th" },
  { name: "Lisa White", age: 14, grade: "9th" }
]);
```

```
db.students.insertMany([
    {
        name: "John Doe", 
        age: 12, 
        grade: "7th", 
        address: { city: "New York", state: "NY" }, 
        subjects: ["Math", "Science"]
    },
    {
        name: "Jane Smith", 
        age: 13, 
        grade: "8th", 
        address: { city: "Los Angeles", state: "CA" }, 
        subjects: ["English", "History"]
    },
    {
        name: "Alex Johnson", 
        age: 11, 
        grade: "6th", 
        address: { city: "Chicago", state: "IL" }, 
        subjects: ["Science", "PE"]
    },
    {
        name: "Emily Davis", 
        age: 14, 
        grade: "9th", 
        address: { city: "Miami", state: "FL" }, 
        subjects: ["Math", "Art"]
    },
    {
        name: "Michael Brown", 
        age: 12, 
        grade: "7th", 
        address: { city: "Dallas", state: "TX" }, 
        subjects: ["History", "Math"]
    }
]);
```

```
db.students.bulkWrite({name:"John Doe", age:12});
```

# Select All Records

```
db.students.find()
```