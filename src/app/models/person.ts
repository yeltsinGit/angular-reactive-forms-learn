interface IPerson {
  id?: number,
  name: string,
  username?: string;
  email?: string;
  address?: {
    street?: string;
    suite?: string;
    city?: string;
    zipcode?: string;
    geo?: {
      lat?: string;
      lng?: string;
    }
  },
  phone?: string;
  website?: string;
  company?: {
    name?: string;
    catchPhrase?: string;
    bs?: string;
  };
  sayHello(): string;
}

class Person implements IPerson {
  constructor(public name: string) {
  }

  sayHello(): string {
    return `Hello, I am ${this.name}!`;
  }
}

export { Person, IPerson };