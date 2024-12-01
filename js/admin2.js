// Simple password for demo (in production, use proper authentication)
const ADMIN_PASSWORD = 'surag123';

function authenticate() {
    const password = document.getElementById('password').value;
    if (password === ADMIN_PASSWORD) {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('invoiceForm').style.display = 'block';
    } else {
        alert('Invalid password');
    }
}

// Initialize jsPDF
window.jsPDF = window.jspdf.jsPDF;

let expenseRowCount = 0;

function addExpenseRow() {
    const container = document.getElementById('additionalExpenses');
    const rowDiv = document.createElement('div');
    rowDiv.className = 'row mb-2';
    rowDiv.id = `expense-row-${expenseRowCount}`;
    
    rowDiv.innerHTML = `
        <div class="col-md-5">
            <input type="text" class="form-control" placeholder="Expense Description" name="expense-desc-${expenseRowCount}" required>
        </div>
        <div class="col-md-5">
            <input type="number" class="form-control" placeholder="Amount" name="expense-amount-${expenseRowCount}" required min="0">
        </div>
        <div class="col-md-2">
            <button type="button" class="btn btn-danger" onclick="removeExpenseRow(${expenseRowCount})">
                <i class="bi bi-trash"></i>
            </button>
        </div>
    `;
    
    container.appendChild(rowDiv);
    expenseRowCount++;
}

function removeExpenseRow(id) {
    const row = document.getElementById(`expense-row-${id}`);
    row.remove();
}

function getAdditionalExpenses() {
    const expenses = [];
    const container = document.getElementById('additionalExpenses');
    const rows = container.children;
    
    for (let row of rows) {
        const desc = row.querySelector('input[type="text"]').value;
        const amount = parseFloat(row.querySelector('input[type="number"]').value);
        if (desc && amount) {
            expenses.push({ description: desc, amount: amount });
        }
    }
    
    return expenses;
}

document.getElementById('generateInvoiceForm').addEventListener('submit', function(e) {
    e.preventDefault();
    generateInvoice();
});

function generateInvoice() {
    const doc = new jsPDF();
    
    // Add logo
    const logoPath = 'assets/puneet.jpg';  // Updated path to be relative to the HTML file
    try {
        doc.addImage(logoPath, 'JPG', 20, 10, 12, 15);
    } catch (error) {
        console.warn('Logo could not be loaded:', error);
    }

    // Add homestay name next to logo
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Doddagadde Stays', 40, 20);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Chikmagalur', 40, 25);

    // Get form values
    const guestName = document.getElementById('guestName').value;
    const guestAddress = document.getElementById('guestAddress').value;
    const checkInDate = new Date(document.getElementById('checkInDate').value);
    const checkOutDate = new Date(document.getElementById('checkOutDate').value);
    const numGuests = parseInt(document.getElementById('numGuests').value);
    const ratePerPerson = parseFloat(document.getElementById('ratePerPerson').value);
    const stayType = document.getElementById('stayType').value;
    const invoiceNumber = document.getElementById('invoiceNumber').value;

    // Calculate number of nights and total
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const stayTotal = nights * numGuests * ratePerPerson;
    const additionalExpenses = getAdditionalExpenses();
    const additionalTotal = additionalExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const grandTotal = stayTotal + additionalTotal;

    // Set document properties
    doc.setProperties({
        title: 'Doddagadde Stays Invoice',
        subject: 'Invoice for ' + guestName,
        author: 'Doddagadde Stays',
        keywords: 'invoice, homestay',
        creator: 'Doddagadde Stays'
    });

    // Define styles
    const tableStyle = {
        theme: 'plain',
        styles: {
            fontSize: 9,
            cellPadding: 4,
            lineColor: [200, 200, 200],
            lineWidth: 0.1
        },
        headStyles: {
            fillColor: [240, 240, 240],
            textColor: [0, 0, 0],
            fontSize: 9,
            fontStyle: 'bold',
            halign: 'left'
        },
        columnStyles: {
            amount: { halign: 'right' }
        }
    };

    // Invoice Title
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('INVOICE', 150, 15);
    
    // Invoice Details
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    if (invoiceNumber) {
        doc.text(`Invoice No: ${invoiceNumber}`, 150, 20);
    } else {
        doc.text(`Invoice No: INV-${new Date().getTime().toString().slice(-6)}`, 150, 20);
    }
    doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, 150, 24);

    // Separator Line
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.1);
    doc.line(20, 28, 190, 28);

    // Bill To Section
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('BILL TO:', 20, 35);
    doc.setFont('helvetica', 'normal');
    doc.text(guestName, 20, 40);
    doc.text(guestAddress, 20, 44);

    // Stay Details Table
    doc.autoTable({
        startY: 50,
        head: [['DESCRIPTION', 'AMOUNT']],
        body: [
            [`${stayType}\n(${nights} nights × ${numGuests} guests × Rs.${ratePerPerson.toLocaleString('en-IN')})`, 
             `Rs. ${stayTotal.toLocaleString('en-IN')}`]
        ],
        ...tableStyle,
        columnStyles: {
            0: { cellWidth: 130 },
            1: { cellWidth: 50, halign: 'right' }
        },
        margin: { left: 15, right: 15 },
        styles: {
            overflow: 'linebreak',
            cellWidth: 'wrap'
        }
    });

    let currentY = doc.lastAutoTable.finalY;

    // Additional Expenses Table (if any)
    if (additionalExpenses.length > 0) {
        const expenseData = additionalExpenses.map(exp => [
            exp.description,
            `Rs. ${exp.amount.toLocaleString('en-IN')}`
        ]);

        doc.autoTable({
            startY: currentY,
            body: expenseData,
            ...tableStyle,
            columnStyles: {
                0: { cellWidth: 130 },
                1: { cellWidth: 50, halign: 'right' }
            },
            margin: { left: 15, right: 15 },
            styles: {
                overflow: 'linebreak',
                cellWidth: 'wrap'
            }
        });

        currentY = doc.lastAutoTable.finalY;
    }

    // Total Section
    doc.autoTable({
        startY: currentY,
        body: [
            ['Sub Total:', `Rs. ${stayTotal.toLocaleString('en-IN')}`],
            ['Additional Charges:', `Rs. ${additionalTotal.toLocaleString('en-IN')}`],
            ['Total Amount:', `Rs. ${grandTotal.toLocaleString('en-IN')}`]
        ],
        ...tableStyle,
        columnStyles: {
            0: { cellWidth: 130 },
            1: { cellWidth: 50, halign: 'right' }
        },
        margin: { left: 15, right: 15 }
    });

    // Footer
    currentY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(8);
    doc.text('Thank you for choosing Doddagadde Stays!', 105, currentY, { align: 'center' });

    // Save the PDF
    doc.save(`Doddagadde_Stays_Invoice_${guestName.replace(/\s+/g, '_')}.pdf`);
}

function generateTestInvoice() {
    // Fill form with test data
    document.getElementById('guestName').value = 'John Doe';
    document.getElementById('guestAddress').value = '123 Test Street, Test City';
    document.getElementById('checkInDate').value = '2023-08-01';
    document.getElementById('checkOutDate').value = '2023-08-03';
    document.getElementById('numGuests').value = '2';
    document.getElementById('ratePerPerson').value = '1500';
    document.getElementById('stayType').value = 'Stay with Food';
    
    // Add a test additional expense
    addExpenseRow();
    const expenseDesc = document.querySelector('input[name^="expense-desc"]');
    const expenseAmount = document.querySelector('input[name^="expense-amount"]');
    if (expenseDesc && expenseAmount) {
        expenseDesc.value = 'Extra Meals';
        expenseAmount.value = '500';
    }
    
    // Generate the invoice
    generateInvoice();
}
