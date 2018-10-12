import models from '../models';
import faker from 'faker/locale/id_ID';

exports.getUsers = (req, res) => {
    models.User.all().then((users) => {
        res.status(200).json({
            "messages":"All Users",
            users
        });;
    }).catch((err) => {
        res.status(500).json({
            "message": err.message
        });
    });
}

exports.getMitra = (req, res) => {
    
    let mitra = [];
    for (let i = 0; i < 10; i++) {
        let nama_mitra = faker.company.companyName(0);
        let prefix = (faker.lorem.slug(1)).toUpperCase();
        let pajak = 10;
        let image = faker.image.food(130,70);
        let contact = {
            nama: faker.name.findName(),
            email: faker.internet.email(),
            no_hp: faker.phone.phoneNumber()
        }
        let alamat_toko = {
            alamat: faker.address.streetAddress(true),
            provinsi: faker.address.state(false)
        }

        mitra.push({
            nama_mitra: nama_mitra,
            prefix: prefix,
            pajak: pajak,
            image:image,
            contact: contact,
            alamat_toko: alamat_toko
        });
    }
    res.send(
        mitra
    )
}