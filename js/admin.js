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
    
    // Get form values
    const guestName = document.getElementById('guestName').value;
    const guestAddress = document.getElementById('guestAddress').value;
    const checkInDate = new Date(document.getElementById('checkInDate').value);
    const checkOutDate = new Date(document.getElementById('checkOutDate').value);
    const numGuests = parseInt(document.getElementById('numGuests').value);
    const ratePerPerson = parseFloat(document.getElementById('ratePerPerson').value);
    const additionalExpenses = getAdditionalExpenses();

    // Calculate number of nights and total
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const stayTotal = nights * numGuests * ratePerPerson;
    const additionalTotal = additionalExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const grandTotal = stayTotal + additionalTotal;

    // Set document properties
    doc.setProperties({
        title: 'Surag Homestay Invoice',
        subject: 'Invoice for ' + guestName,
        author: 'Surag Homestay',
        keywords: 'invoice, homestay',
        creator: 'Surag Homestay'
    });

    // Header
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('SURAG HOMESTAY', 105, 20, { align: 'center' });
    
    doc.setFontSize(16);
    doc.text('INVOICE', 105, 30, { align: 'center' });

    // Invoice details
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    // Left side details
    doc.text('Bill To:', 20, 45);
    doc.setFont('helvetica', 'bold');
    doc.text(guestName, 20, 50);
    doc.setFont('helvetica', 'normal');
    doc.text(guestAddress, 20, 55);

    // Right side details
    doc.text(`Invoice #: ${new Date().getTime().toString().slice(-6)}`, 140, 45);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 140, 50);

    // Stay Details Table
    doc.autoTable({
        startY: 65,
        head: [['Stay Details', '']],
        body: [
            ['Check-in Date', checkInDate.toLocaleDateString()],
            ['Check-out Date', checkOutDate.toLocaleDateString()],
            ['Number of Nights', nights.toString()],
            ['Number of Guests', numGuests.toString()],
            ['Rate per Person per Day', `₹${ratePerPerson.toFixed(2)}`],
            ['Calculation', `${nights} nights × ${numGuests} guests × ₹${ratePerPerson.toFixed(2)}`],
            ['Stay Total', `₹${stayTotal.toFixed(2)}`]
        ],
        theme: 'grid',
        headStyles: { fillColor: [66, 66, 66] },
        styles: { fontSize: 10 },
        columnStyles: {
            0: { cellWidth: 80 },
            1: { cellWidth: 70 }
        }
    });

    // Additional Expenses Table
    if (additionalExpenses.length > 0) {
        const expenseData = additionalExpenses.map(exp => [
            exp.description,
            `₹${exp.amount.toFixed(2)}`
        ]);

        doc.autoTable({
            startY: doc.lastAutoTable.finalY + 10,
            head: [['Additional Expenses', 'Amount']],
            body: expenseData,
            theme: 'grid',
            headStyles: { fillColor: [66, 66, 66] },
            styles: { fontSize: 10 },
            columnStyles: {
                0: { cellWidth: 80 },
                1: { cellWidth: 70 }
            }
        });
    }

    // Total
    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 10,
        head: [['', '']],
        body: [
            ['Stay Charges', `₹${stayTotal.toFixed(2)}`],
            ['Additional Charges', `₹${additionalTotal.toFixed(2)}`],
            ['Grand Total', `₹${grandTotal.toFixed(2)}`]
        ],
        theme: 'grid',
        headStyles: { fillColor: [255, 255, 255] },
        styles: { fontSize: 10 },
        columnStyles: {
            0: { cellWidth: 80, fontStyle: 'bold' },
            1: { cellWidth: 70 }
        }
    });

    // Footer
    const footerY = doc.lastAutoTable.finalY + 20;
    doc.setFontSize(10);
    doc.text('Thank you for choosing Surag Homestay!', 105, footerY, { align: 'center' });
    doc.setFontSize(8);
    doc.text('This is a computer generated invoice.', 105, footerY + 5, { align: 'center' });

    // Save PDF
    doc.save(`invoice_${guestName.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`);
}
