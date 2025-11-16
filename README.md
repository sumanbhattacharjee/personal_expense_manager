```markdown
# personal_expense_manager
This is a simple app to manage personal expenses grouped by user defined categories.

Converted to a minimal Maven Spring Boot project skeleton.

Getting started
-----------------

1. Build:

```bash
mvn -v
mvn clean package
```

2. Run:

```bash
mvn spring-boot:run
```

3. Open the sample endpoint:

`GET http://localhost:8080/api/expenses/sample`

4. H2 console (dev): `http://localhost:8080/h2-console` (jdbc url: `jdbc:h2:mem:expensesdb`)

Next steps
----------

- Add repositories, services and controllers for full CRUD.
- Add tests and CI build.

```
