
Here’s an example of how you would use `bulkWrite` to delete a single document from a MongoDB collection using the `deleteOne` operation:

### Delete One Example with `bulkWrite`:

```
db.students.bulkWrite([
    {
        deleteOne: {
            filter: { name: "John Doe" }
        }
    }
]);
```

### Explanation:
- **`deleteOne`**: Deletes the first document that matches the filter `{ name: "John Doe" }`.
- The `filter` specifies the condition for which document to delete. In this case, it looks for a student with the name "John Doe."

This operation will remove just one document, even if there are multiple documents matching the condition.