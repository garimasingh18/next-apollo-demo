import casual from 'casual-browserify'
const LIMIT_DATA = 200; //changing it from 2000 for testing purpose

export const resolvers = {
    Query: {
        name() {
            return casual.name
        },
        users: (parent, args) => {
            const { limit, offset } = args;
            const numberOfUsers = (offset ?? 0) + (limit ?? 0);
            const users = [];

            for (let i = offset ?? 0; i < numberOfUsers; i++) {
                if (offset < LIMIT_DATA) {
                    users.push({
                        name: casual.full_name,
                        email: casual.email,
                        phoneNumber: casual.phone,
                        address: {
                            street: casual.address,
                            city: casual.address1,
                            zipCode: casual.address2,
                        }
                    });
                }

            }
            return users;
        },
    },
};
