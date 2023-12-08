const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

// Membuat folder data jika belum ada
const dirPath = './data';

if(!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// Membuat file contacts.json jika belum ada
const dataPath = './data/contacts.json';

if(!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8')
    const contacts = JSON.parse(file);

    return contacts;
}

// Fungsi simpan kontak
const createContact = (nama, email, telepon) => {
    const contact = { nama, email, telepon };

    const contacts = loadContact();

    // Cek duplikat
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if(duplikat) {
        console.log(
            chalk.red.inverse.bold(
                `Maaf, ${nama} sudah terdaftar di dalam kontak.`
            )
        );
        return false;
    }

    // Cek email
    if(email) {
        if(!validator.isEmail(email)) {
            console.log(
                chalk.red.inverse.bold(
                    `Maaf, ${email} bukan email yang valid.`
                )
            );
            return false;
        }
    }

    // Cek telepon
    if(!validator.isMobilePhone(telepon, 'id-ID')) {
        console.log(
            chalk.red.inverse.bold(
                `Maaf, ${telepon} bukan nomor telepon yang valid.`
            )
        );
        return false;
    }

    contacts.push(contact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

    console.log(
        chalk.green.inverse.bold(
            `Terima kasih sudah memasukkan kontak Anda.`
        )
    );
}

// Fungsi list kontak
const listContact = () => {
    const contacts = loadContact();

    console.log(chalk.inverse.bold('Daftar Kontak:'));
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.telepon}`);
    });
}

// Fungsi detail kontak
const detailContact = (nama) => {
    const contacts = loadContact();

    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

    if(!contact) {
        console.log(
            chalk.red.inverse.bold(
                `Maaf, ${nama} tidak terdaftar di dalam kontak.`
            )
        );
        return false;
    }

    console.log(chalk.inverse.bold(contact.nama));
    console.log(contact.telepon);

    if(contact.email) {
        console.log(contact.email);
    }
}

// Fungsi hapus kontak
const deleteContact = (nama) => {
    const contacts = loadContact();

    const newContacts = contacts.filter(
        (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
    );

    if(contacts.length === newContacts.length) {
        console.log(
            chalk.red.inverse.bold(
                `Maaf, ${nama} tidak terdaftar di dalam kontak.`
            )
        );
        return false;
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts));

    console.log(
        chalk.green.inverse.bold(
            `Terima kasih sudah menghapus kontak ${nama}.`
        )
    );
}

module.exports = { createContact, listContact, detailContact, deleteContact };