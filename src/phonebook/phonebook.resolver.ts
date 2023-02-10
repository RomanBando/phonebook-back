import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import S3Service from 'src/s3/s3Service.service';
import { CreateContactDto, UpdateContactDto } from './dto/contact.dto';
import { Phonebook } from './models/phonebook.model';
import { PhonebookService } from './phonebook.service';

@Resolver(() => Phonebook)
export class PhonebookResolver {
  constructor(
    private phonebookService: PhonebookService,
    private s3Service: S3Service,
  ) {}

  @Query(() => [Phonebook], { name: 'findContacts' })
  findContacts(
    @Args('search', { type: () => String, nullable: true }) search: string,
  ) {
    return this.phonebookService.find(search);
  }

  @Mutation(() => String, { name: 'createContact' })
  async createContact(@Args('input') input: CreateContactDto) {
    await this.phonebookService.create(input);
    return 'success';
  }

  @Mutation(() => String, { name: 'updateContact' })
  async updateContact(@Args('input') input: UpdateContactDto) {
    await this.phonebookService.update(input);
    return 'success';
  }

  @Mutation(() => String, { name: 'removeContact' })
  async removeContact(@Args('id', { type: () => String }) id: string) {
    await this.phonebookService.remove(id);
    return 'success';
  }

  @Mutation(() => String, { name: 'getUploadUrl' })
  getUploadUrl() {
    return this.s3Service.getUploadUrl();
  }
}
