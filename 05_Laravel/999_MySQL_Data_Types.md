## Common MySQL Data Types

Reference:

+ [Full list of MySQL Data Types](http://help.scibit.com/mascon/masconMySQL_Field_Types.html)
+ [Laravel Schema Commands](http://laravel.com/docs/schema#adding-columns)

### Text

| MySQL Data Type  	|  Description  	| Range | Example | Laravel
|---	|---	|--- |--- |---
| `CHAR(size)`  	| *Fixed* length String. | 0-255 | US State | `$table->char('state', 2)`	|
| `VARCHAR(size)`  	|  *Variable* length String. |0-255| Email address | `$table->string('email')`
| `TEXT` | Variable length String; can store up to 2GB of text data. | 0 - 65535 | Blog post | `$table->text('post')`

### Numbers


| MySQL Data Type  	|  Description  	| Range | Example | Laravel
|---	|---	|--- |--- |---
| `INT`  	| Whole number. | -2147­483648 to 214748­3647 | Page count | `$table->integer('page_count')`	|
| `FLOAT`  	|  A small decimal number. | 7 Digits | Scientific calculations | `$table->float('distance')`
| `DOUBLE`  	|  A large decimal number. | 15-16 Digits | Scientific calculations | `$table->double('distance')`
| `DECIMAL`  	|  A DOUBLE stored as a string, allowing for a fixed decimal point. | 28-29 Significant digits | Money, ex. bank balance | `$table->decimal('bank_balance')`


### Misc
| MySQL Data Type  	|  Description  	| Range | Example | Laravel
|---	|---	|--- |--- |---
| `BOOLEAN`  	| Alias for TINYINT(1) | TINYINT(1) | Logged in | `$table->boolean('logged_in');`
| `BLOB` | Binary Large Object | 0 - 65535 | An image | `$table->binary('image')`

