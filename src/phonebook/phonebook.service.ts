import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateContactDto, UpdateContactDto } from './dto/contact.dto';
import { Phonebook } from './models/phonebook.model';

@Injectable()
export class PhonebookService {
  constructor(
    @InjectModel(Phonebook)
    private readonly phonebookModel: typeof Phonebook,
  ) {}
//
  async create(createContactDto: CreateContactDto): Promise<Phonebook> {
    return this.phonebookModel.create({
      firstName: createContactDto.firstName,
      lastName: createContactDto.lastName,
      nickname: createContactDto.nickname,
      name: createContactDto.name,
      phoneNumber: createContactDto.phoneNumber,
      address: createContactDto.address,
      photo: createContactDto.photo,
    });
  }

  async findAll(): Promise<Phonebook[]> {
    return this.phonebookModel.findAll({
      order: [['name', 'DESC']],
    });
  }

  async find(name: string): Promise<Phonebook[]> {
    const pattern = { [Op.like]: `${name}%` };
    const filter = name
      ? {
          [Op.or]: [
            { firstName: pattern },
            { lastName: pattern },
            { nickname: pattern },
          ],
        }
      : undefined;

    return this.phonebookModel.findAll({
      where: filter,
      order: [['name', 'DESC']],
    });
  }

  async update(data: UpdateContactDto): Promise<void> {
    await this.phonebookModel.update(data, { where: { id: data.id } });
  }

  async remove(id: string): Promise<void> {
    await this.phonebookModel.destroy({ where: { id } });
  }
}
