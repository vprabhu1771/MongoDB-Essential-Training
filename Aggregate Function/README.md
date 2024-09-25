

```
db.students.insertMany([
  {
    "_id": 1,
    "name": "RAJA",
    "gender": "M",
    "course": "PYTHON",
    "total_fees": 10000.00
  },
  {
    "_id": 2,
    "name": "RAM",
    "gender": "M",
    "course": "JAVA",
    "total_fees": 10000.00
  },
  {
    "_id": 3,
    "name": "ABI",
    "gender": "F",
    "course": "C",
    "total_fees": 2000.00
  },
  {
    "_id": 4,
    "name": "ANU",
    "gender": "F",
    "course": "C++",
    "total_fees": 2000.00
  },
  {
    "_id": 5,
    "name": "KUMAR",
    "gender": "M",
    "course": "PYTHON",
    "total_fees": 10000.00
  }
])
```

1 - AVG Function

To calculate the average value of a field using the MongoDB aggregation framework, you can use the `$avg` operator. Here's an example to calculate the average `total_fees` for the students in the `students` collection:

```js
db.students.aggregate([
  {
    $group: {
      _id: null, // Group by null to get the overall average
      average_fees: { $avg: "$total_fees" }
    }
  }
])
```

This query will calculate the average of the `total_fees` field across all students and return a result like this:

```json
[
  {
    "_id": null,
    "average_fees": 7200.00
  }
]
```

2 - SUM Function

To calculate the sum of the `total_fees` for all students in the `students` collection using MongoDB's aggregation framework, you can use the `$sum` operator. Here's an example:

```js
db.students.aggregate([
  {
    $group: {
      _id: null, // Group by null to sum across all documents
      total_fees_sum: { $sum: "$total_fees" }
    }
  }
])
```

This query will calculate the total sum of the `total_fees` field across all students and return a result like this:

```json
[
  {
    "_id": null,
    "total_fees_sum": 34000.00
  }
]
```

Here, `total_fees_sum` shows the total amount of fees for all students combined.


3 - COUNT Function

In this example, the `total_fees` are averaged, and the result is displayed under the `average_fees` field.

You can use the MongoDB aggregation framework to count the total number of students in the `students` collection. Here's the query using the `$count` stage:

```js
db.students.aggregate([
  {
    $count: "total_students"
  }
])
```

This will return the total count of documents (students) in the collection, like this:

```json
[
  {
    "total_students": 5
  }
]
```

4 - COUNT DISTINCT Function

To count the number of distinct values for a particular field in MongoDB, you can use the aggregation framework with the `$group` stage and `$addToSet` to collect distinct values, followed by `$size` to count them.

For example, if you want to count the distinct courses that students are enrolled in, you can do it like this:

```js
db.students.aggregate([
  {
    $group: {
      _id: null, // Group by null to consider all documents
      distinct_courses: { $addToSet: "$course" } // Collect distinct courses
    }
  },
  {
    $project: {
      _id: 0, // Exclude _id from the output
      distinct_course_count: { $size: "$distinct_courses" } // Count distinct courses
    }
  }
])
```

This query will return the number of distinct courses that students are enrolled in:

```json
[
  {
    "distinct_course_count": 4
  }
]
```

In this example, the query counts how many distinct courses are offered (like "PYTHON", "JAVA", "C", "C++").

5 - MAX Function

To find the maximum value of a field using the MongoDB aggregation framework, you can use the `$max` operator. Here's an example to find the maximum `total_fees` among the students in the `students` collection:

```js
db.students.aggregate([
  {
    $group: {
      _id: null, // Group by null to get the overall maximum
      max_fees: { $max: "$total_fees" }
    }
  }
])
```

This query will calculate the maximum value of the `total_fees` field and return a result like this:

```json
[
  {
    "_id": null,
    "max_fees": 10000.00
  }
]
```

In this example, the query returns the highest `total_fees` value from all student records.

6 - MIN Function 

To find the minimum value of a field using the MongoDB aggregation framework, you can use the `$min` operator. Here's an example to find the minimum `total_fees` among the students in the `students` collection:

```js
db.students.aggregate([
  {
    $group: {
      _id: null, // Group by null to get the overall minimum
      min_fees: { $min: "$total_fees" }
    }
  }
])
```

This query will calculate the minimum value of the `total_fees` field and return a result like this:

```json
[
  {
    "_id": null,
    "min_fees": 2000.00
  }
]
```

In this example, the query returns the lowest `total_fees` value from all student records.


7 - Count By Gender Wise

To get the count of students by gender (e.g., how many are male and how many are female) using MongoDB's aggregation framework, you can use the `$group` stage to group the data by `gender` and then use the `$count` operator. Here's an example:

```js
db.students.aggregate([
  {
    $group: {
      _id: "$gender", // Group by gender
      count: { $sum: 1 } // Count the number of documents per gender
    }
  }
])
```

This will give you the count of students grouped by their gender:

```json
[
  {
    "_id": "M",
    "count": 3
  },
  {
    "_id": "F",
    "count": 2
  }
]
```

In this example, the query counts how many male (`"M"`) and female (`"F"`) students are in the `students` collection.

8 - count of male students studying each course

To get the count of male students studying each course, you can use MongoDB's aggregation framework. You can group by both `gender` and `course` and then count the number of students in each course for males (`"M"`).

Here's the query to achieve that:

```js
db.students.aggregate([
  {
    $match: { gender: "M" } // Filter to only include male students
  },
  {
    $group: {
      _id: "$course", // Group by course
      male_student_count: { $sum: 1 } // Count the number of male students in each course
    }
  }
])
```

This will give you the count of male students for each course:

```json
[
  {
    "_id": "PYTHON",
    "male_student_count": 2
  },
  {
    "_id": "JAVA",
    "male_student_count": 1
  }
]
```

In this example, the query filters for male students (`"M"`) and then groups them by course to get the count of male students per course.

9 - count of female students studying each course

To get the count of female students studying each course, you can use a similar approach to the previous query, but this time you will filter for female students (`"F"`). Here’s how to do it using MongoDB's aggregation framework:

```js
db.students.aggregate([
  {
    $match: { gender: "F" } // Filter to only include female students
  },
  {
    $group: {
      _id: "$course", // Group by course
      female_student_count: { $sum: 1 } // Count the number of female students in each course
    }
  }
])
```

This will give you the count of female students for each course:

```json
[
  {
    "_id": "C",
    "female_student_count": 1
  },
  {
    "_id": "C++",
    "female_student_count": 1
  }
]
```

In this example, the query filters for female students (`"F"`) and then groups them by course to get the count of female students per course.

{ name: "a" }