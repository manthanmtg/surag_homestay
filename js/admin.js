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
        title: 'Paramathma Stays Invoice',
        subject: 'Invoice for ' + guestName,
        author: 'Paramathma Stays',
        keywords: 'invoice, homestay',
        creator: 'Paramathma Stays'
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

    // Header
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('PARAMATHMA STAYS', 20, 15);
    
    // Contact Info
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('Paramathma Stays, Chikmagalur', 20, 20);
    doc.text('Phone: +91 1234567890', 20, 24);

    // Invoice Title
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('INVOICE', 150, 15);
    
    // Invoice Details
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(`Invoice No: INV-${new Date().getTime().toString().slice(-6)}`, 150, 20);
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
            [`Stay Charges\n(${nights} nights × ${numGuests} guests × Rs.${ratePerPerson.toLocaleString('en-IN')})`, 
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

    // Add some spacing before totals
    currentY += 5;

    // Total Section
    doc.autoTable({
        startY: currentY,
        body: [
            ['Sub Total:', `Rs. ${stayTotal.toLocaleString('en-IN')}`],
            ['Additional Charges:', `Rs. ${additionalTotal.toLocaleString('en-IN')}`],
            ['Total Amount:', `Rs. ${grandTotal.toLocaleString('en-IN')}`]
        ],
        ...tableStyle,
        styles: {
            ...tableStyle.styles,
            fontSize: 10,
            fontStyle: 'bold',
            overflow: 'linebreak',
            cellWidth: 'wrap'
        },
        columnStyles: {
            0: { cellWidth: 130, fillColor: [245, 245, 245] },
            1: { cellWidth: 50, halign: 'right', fillColor: [245, 245, 245] }
        },
        margin: { left: 15, right: 15 }
    });

    // Terms and Notes
    currentY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('Terms & Conditions:', 20, currentY);
    doc.setFont('helvetica', 'normal');
    currentY += 4;
    doc.text('1. Check-in time: 12:00 PM, Check-out time: 11:00 AM', 20, currentY);
    currentY += 4;
    doc.text('2. This is a computer generated invoice.', 20, currentY);
    
    // Footer
    doc.setFontSize(8);
    doc.text('Thank you for choosing Paramathma Stays!', 105, 280, { align: 'center' });

    // Save PDF
    doc.save(`Paramathma_Stays_Invoice_${guestName.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`);
}

function generateTestInvoice() {
    // Generate fake data
    const fakeGuestName = faker.name.findName();
    const fakeAddress = `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()} ${faker.address.zipCode()}`;
    
    // Random dates within next 30 days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 15)); // Random start within next 15 days
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 5) + 1); // Random 1-5 nights stay
    
    // Random number of guests and rate
    const numGuests = Math.floor(Math.random() * 4) + 1; // 1-4 guests
    const ratePerPerson = Math.floor(Math.random() * 1000) + 1500; // 1500-2500 rate
    
    // Generate 1-3 random additional expenses
    const numExpenses = Math.floor(Math.random() * 3) + 1;
    const additionalExpenses = [];
    const expenseTypes = ['Food Charges', 'Activity Charges', 'Transportation', 'Extra Bed', 'Laundry', 'Guide Service'];
    
    for (let i = 0; i < numExpenses; i++) {
        additionalExpenses.push({
            description: expenseTypes[Math.floor(Math.random() * expenseTypes.length)],
            amount: Math.floor(Math.random() * 1000) + 500 // 500-1500 for additional expenses
        });
    }

    // Set form values for preview
    document.getElementById('guestName').value = fakeGuestName;
    document.getElementById('guestAddress').value = fakeAddress;
    document.getElementById('checkInDate').value = startDate.toISOString().split('T')[0];
    document.getElementById('checkOutDate').value = endDate.toISOString().split('T')[0];
    document.getElementById('numGuests').value = numGuests;
    document.getElementById('ratePerPerson').value = ratePerPerson;

    // Clear existing additional expenses
    document.getElementById('additionalExpenses').innerHTML = '';
    
    // Add fake additional expenses
    additionalExpenses.forEach(exp => {
        addExpenseRow();
        const lastRow = document.getElementById(`expense-row-${expenseRowCount-1}`);
        lastRow.querySelector('input[type="text"]').value = exp.description;
        lastRow.querySelector('input[type="number"]').value = exp.amount;
    });

    // Generate the invoice
    generateInvoice();
}
