import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateContactDto {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  nickname: string;

  @Field()
  name: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  phoneNumber: string[];

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  photo: string;

  @Field({ nullable: true })
  photoFilter: string;
}

@InputType()
export class UpdateContactDto {
  @Field()
  id: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  nickname: string;

  @Field({ nullable: true })
  name: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  phoneNumber: string[];

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  photo: string;

  @Field({ nullable: true })
  photoFilter: string;
}
