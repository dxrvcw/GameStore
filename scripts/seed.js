const { db } = require('@vercel/postgres')
const { games } = require('./placeholder-data.js')
const { hash } = require('bcrypt')

async function createPublicSchema(client) {
	await client.sql`CREATE SCHEMA IF NOT EXISTS public`
	console.log('Created schema if not exist!')
}

async function seedGames(client) {
	const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS public.games (
        id UUID PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price FLOAT NOT NULL,
        category VARCHAR(255) NOT NULL,
        platform VARCHAR(255) NOT NULL,
				image_url VARCHAR(255) NOT NULL
      );
    `
	console.log(`Created games table!`)

	const insertedGames = await Promise.all(
		games.map(async game => {
			return client.sql`
			INSERT INTO games (id, name, price, category, platform, image_url)
			VALUES (${game.id}, ${game.name}, ${game.price}, ${game.category}, ${game.platform}, ${game.image_url})
			ON CONFLICT (id) DO NOTHING;
		`
		})
	)

	console.log(`Seeded ${insertedGames.length} games`)

	return {
		createTable,
		users: insertedGames,
	}
}

async function main() {
	const client = await db.connect()

	await createPublicSchema(client)
	await seedGames(client)

	await client.end()
}

main().catch(err => {
	console.error('An error occurred while attempting to seed the database:', err)
})
