const yargs = require("yargs");
const { createContact, listContact, detailContact, deleteContact } = require("./contacts");

// Create kontak
yargs.command({
    command: "add",
    describe: "Buat kontak baru",
    builder: {
        nama: {
            describe: "Nama Lengkap",
            demandOption: true,
            type: "string",
        },
        email: {
            describe: "Email",
            demandOption: false,
            type: "string",
        },
        telepon: {
            describe: "Telepon",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        createContact(argv.nama, argv.email, argv.telepon);
    },
})
.demandCommand();

// List kontak
yargs.command({
    command: "list",
    describe: "Menampilkan semua kontak",
    handler() {
        listContact();
    },
});

// Detail kontak
yargs.command({
    command: "show",
    describe: "Menampilkan detail kontak",
    builder: {
        nama: {
            describe: "Kontak yang ingin ditampilkan",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        detailContact(argv.nama);
    },
});

// Hapus kontak
yargs.command({
    command: "delete",
    describe: "Menghapus kontak",
    builder: {
        nama: {
            describe: "Kontak yang ingin dihapus",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        deleteContact(argv.nama);
    },
})

yargs.parse();