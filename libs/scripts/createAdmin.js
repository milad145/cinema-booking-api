import {userModel} from "../database/index.js";

export const createAdmin = async ({adminUsername, adminPassword}) => {
    const adminExists = await userModel.getByQuery({username: adminUsername});
    if (!adminExists) {
        await userModel.create({
            username: adminUsername,
            password: adminPassword,
            role: 'admin'
        });
        console.log(`Admin user created: ${adminUsername} / ${adminPassword}`);
    } else {
        console.log('Admin user already exists');
    }
};
