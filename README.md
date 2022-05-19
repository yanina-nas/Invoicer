This is a single page application that allows to generate invoices in PDF.

## Getting Started

Firstly, install dependencies:

```bash
npm i
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Filling up the form

You can start filling up the fields. Fields without values will not be included into generated invoice document.

For convenience, field values can be hardcoded to avoid manual entry next time.

Invoicer supports two formats for rate: hourly rate and daily rate with hourly rate being default. To switch between daily rate and hourly rate, click the button under invoice date field in the third column (counting from left to right) of the form.

Two currencies are supported: `$` and `€`, the former sign is placed before the number in resulting table, and the latter is placed behind.

Selecting date range allows for generation of entries (timesheet table) in the document. Checkbox `Exclude Saturdays and Sundays` will allow to include only workdays from the selected date range to the resulting table. 

## Preview mode
Clicking `Show preview` enables preview mode. In preview mode entries can be modified by a clicking on them, followed by entering a new value. It is possible because in preview mode entries are actually input fields pretending to be unremarkable table cells.

`Show edit buttons` switch makes delete buttons on every entry visible, which allows to delete particular entry or entries. `+` button allows to add a new entry, with values for rate and hours same as in previous timesheet entry. In case of clicking `+` in an empty timesheet, default values (8 working hours per day, and 70 (of chosen currency) hourly rate) will be used.

## Extra expenses
Switch `I need an Extra Expenses block` adds an empty extra expenses block under the timesheet table. Switch `Show edit buttons` allows to create and delete entries with `+` and `-`, respectively. 

Extra expenses table consists of a text field for description, and a field for entering a value for amount. 

Clicking on a field allows to edit it, as these fields are input elements.

## Save as .pdf
Make sure to hide edit mode by turning off the switch `Show edit buttons`. Clicking `I'm done, print this out` opens print preview, where `show background colors` allows to include or exclude colorful header blocks from the result. Click `Save as PDF` to save your invoice.

Thank you for trying out this tool and feel free to share your feedback or add an issue.

