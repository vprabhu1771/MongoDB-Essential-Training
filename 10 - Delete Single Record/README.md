# Delete Document using DeleteOne

The `deleteOne` method will delete the first document that matches the specified condition in the `filter`. Here's the code you provided, which is valid:

```
db.students.deleteOne({ name: "John Doe" });
```

```
db.students.deleteOne({ age: 13 });
```

### Explanation:
- **`deleteOne`**: Deletes the first document that matches the `filter` `{ name: "John Doe" }`.
- In this case, it will search for a student whose `name` is `"John Doe"` and delete that document.

If you wanted to delete all documents matching a condition, you could use `deleteMany` instead.