/**
 * MILLION Real Estate Database Seeding Script
 *
 * This script populates the Supabase database with realistic luxury property data
 * for South Florida's most exclusive markets.
 *
 * Usage:
 * - Development: npm run seed:dev
 * - Production: npm run seed:prod
 * - Reset: npm run seed:reset
 */

import { SEED_DATA } from '../supabase/functions/server/seeds.js'

interface KVStore {
  set(key: string, value: any): Promise<void>
  get(key: string): Promise<any>
  del(key: string): Promise<void>
  getByPrefix(prefix: string): Promise<Array<{ key: string; value: any }>>
}

// Mock KV store for testing/development
const createMockKVStore = (): KVStore => {
  const store = new Map<string, any>()

  return {
    async set(key: string, value: any) {
      store.set(key, value)
    },
    async get(key: string) {
      return store.get(key)
    },
    async del(key: string) {
      store.delete(key)
    },
    async getByPrefix(prefix: string) {
      const results: Array<{ key: string; value: any }> = []
      for (const [key, value] of store.entries()) {
        if (key.startsWith(prefix)) {
          results.push({ key, value })
        }
      }
      return results
    },
  }
}

class DatabaseSeeder {
  private kv: KVStore

  constructor(kvStore: KVStore) {
    this.kv = kvStore
  }

  async seedAgents() {
    console.log('👥 Seeding luxury real estate agents...')

    for (const agent of SEED_DATA.agents) {
      await this.kv.set(`agent:${agent.id}`, agent)
      console.log(`   ✅ ${agent.firstName} ${agent.lastName} - ${agent.title}`)
    }

    console.log(`✨ Successfully seeded ${SEED_DATA.agents.length} agents\n`)
  }

  async seedProperties() {
    console.log('🏡 Seeding South Florida luxury properties...')

    for (const property of SEED_DATA.properties) {
      await this.kv.set(`property:${property.id}`, property)
      console.log(
        `   ✅ ${property.address} - $${property.price.toLocaleString()} (${property.city})`
      )
    }

    console.log(
      `✨ Successfully seeded ${SEED_DATA.properties.length} properties\n`
    )
  }

  async seedSampleLeads() {
    console.log('📋 Creating sample leads...')

    const sampleLeads = [
      {
        id: `lead_${Date.now()}_sample1`,
        firstName: 'Alexandra',
        lastName: 'Thompson',
        email: 'alexandra.thompson@email.com',
        phone: '(305) 555-0198',
        interest: 'buying' as const,
        timeline: '3-6months' as const,
        message:
          'Looking for waterfront properties in Bal Harbour or Fisher Island. Budget up to $15M.',
        propertyId: SEED_DATA.properties[0].id,
        agentId: 'agent_sofia_rodriguez',
        status: 'new' as const,
        source: 'website' as const,
        createdAt: new Date('2025-01-18').toISOString(),
        updatedAt: new Date('2025-01-18').toISOString(),
      },
      {
        id: `lead_${Date.now()}_sample2`,
        firstName: 'Robert',
        lastName: 'Chen',
        email: 'robert.chen@email.com',
        phone: '(305) 555-0199',
        interest: 'investment' as const,
        timeline: '1-3months' as const,
        message:
          'International investor seeking luxury condominiums with strong rental potential.',
        agentId: 'agent_marcus_chen',
        status: 'qualified' as const,
        source: 'referral' as const,
        createdAt: new Date('2025-01-16').toISOString(),
        updatedAt: new Date('2025-01-19').toISOString(),
      },
      {
        id: `lead_${Date.now()}_sample3`,
        firstName: 'Maria',
        lastName: 'Rodriguez',
        email: 'maria.rodriguez@email.com',
        phone: '(305) 555-0200',
        interest: 'selling' as const,
        timeline: 'immediately' as const,
        message:
          'Need to sell Coral Gables estate quickly. Recently relocated to New York.',
        agentId: 'agent_james_wellington',
        status: 'contacted' as const,
        source: 'website' as const,
        createdAt: new Date('2025-01-15').toISOString(),
        updatedAt: new Date('2025-01-17').toISOString(),
      },
    ]

    for (const lead of sampleLeads) {
      await this.kv.set(`lead:${lead.id}`, lead)
      console.log(
        `   ✅ ${lead.firstName} ${lead.lastName} - ${lead.interest} (${lead.status})`
      )
    }

    console.log(`✨ Successfully seeded ${sampleLeads.length} sample leads\n`)
  }

  async seedNewsletterSubscriptions() {
    console.log('📧 Creating sample newsletter subscriptions...')

    const sampleSubscriptions = [
      {
        email: 'investor@luxurygroup.com',
        source: 'website',
        subscribedAt: new Date('2025-01-10').toISOString(),
      },
      {
        email: 'client@privatewealth.com',
        source: 'footer',
        subscribedAt: new Date('2025-01-12').toISOString(),
      },
      {
        email: 'info@familyoffice.com',
        source: 'newsletter',
        subscribedAt: new Date('2025-01-14').toISOString(),
      },
    ]

    for (const subscription of sampleSubscriptions) {
      await this.kv.set(`newsletter:${subscription.email}`, subscription)
      console.log(`   ✅ ${subscription.email} (${subscription.source})`)
    }

    console.log(
      `✨ Successfully seeded ${sampleSubscriptions.length} newsletter subscriptions\n`
    )
  }

  async clearDatabase() {
    console.log('🧹 Clearing existing data...')

    const prefixes = ['property:', 'agent:', 'lead:', 'newsletter:']

    for (const prefix of prefixes) {
      const items = await this.kv.getByPrefix(prefix)
      for (const item of items) {
        await this.kv.del(item.key)
      }
      console.log(`   ✅ Cleared ${items.length} items with prefix "${prefix}"`)
    }

    console.log('🗑️ Database cleared successfully\n')
  }

  async seedAll() {
    console.log('🌟 MILLION Real Estate - Database Seeding Started')
    console.log('='.repeat(60))

    await this.seedAgents()
    await this.seedProperties()
    await this.seedSampleLeads()
    await this.seedNewsletterSubscriptions()

    console.log('='.repeat(60))
    console.log('🎉 Database seeding completed successfully!')

    // Print summary statistics
    await this.printSummary()
  }

  async resetAndSeed() {
    console.log('🔄 MILLION Real Estate - Database Reset & Seed')
    console.log('='.repeat(60))

    await this.clearDatabase()
    await this.seedAll()
  }

  async printSummary() {
    console.log('\n📊 DATABASE SUMMARY')
    console.log('-'.repeat(40))

    const agents = await this.kv.getByPrefix('agent:')
    const properties = await this.kv.getByPrefix('property:')
    const leads = await this.kv.getByPrefix('lead:')
    const newsletters = await this.kv.getByPrefix('newsletter:')

    console.log(`Agents: ${agents.length}`)
    console.log(`Properties: ${properties.length}`)
    console.log(`Leads: ${leads.length}`)
    console.log(`Newsletter Subscribers: ${newsletters.length}`)

    // Property breakdown by city
    const propertiesByCity = new Map()
    properties.forEach(item => {
      const city = item.value.city
      propertiesByCity.set(city, (propertiesByCity.get(city) || 0) + 1)
    })

    console.log('\nProperties by City:')
    for (const [city, count] of propertiesByCity.entries()) {
      console.log(`  ${city}: ${count}`)
    }

    // Price range analysis
    const prices = properties
      .map(item => item.value.price)
      .sort((a, b) => a - b)
    if (prices.length > 0) {
      console.log('\nPrice Range Analysis:')
      console.log(`  Lowest: $${prices[0].toLocaleString()}`)
      console.log(`  Highest: $${prices[prices.length - 1].toLocaleString()}`)
      console.log(
        `  Average: $${Math.round(prices.reduce((a, b) => a + b, 0) / prices.length).toLocaleString()}`
      )
      console.log(
        `  Median: $${prices[Math.floor(prices.length / 2)].toLocaleString()}`
      )
    }

    console.log('\n🏖️ South Florida luxury real estate database ready!')
  }

  async validateData() {
    console.log('🔍 Validating seeded data...')

    const properties = await this.kv.getByPrefix('property:')
    const agents = await this.kv.getByPrefix('agent:')

    let validationErrors = 0

    // Validate properties
    for (const item of properties) {
      const property = item.value

      if (!property.address || !property.city || !property.price) {
        console.error(`❌ Property ${property.id} missing required fields`)
        validationErrors++
      }

      if (property.price < 100000 || property.price > 100000000) {
        console.error(
          `❌ Property ${property.id} has unrealistic price: $${property.price}`
        )
        validationErrors++
      }

      if (property.agentId) {
        const agent = await this.kv.get(`agent:${property.agentId}`)
        if (!agent) {
          console.error(
            `❌ Property ${property.id} references non-existent agent: ${property.agentId}`
          )
          validationErrors++
        }
      }
    }

    // Validate agents
    for (const item of agents) {
      const agent = item.value

      if (!agent.firstName || !agent.lastName || !agent.email) {
        console.error(`❌ Agent ${agent.id} missing required fields`)
        validationErrors++
      }

      if (!agent.licenseNumber || !agent.licenseNumber.startsWith('FL-')) {
        console.error(
          `❌ Agent ${agent.id} has invalid Florida license: ${agent.licenseNumber}`
        )
        validationErrors++
      }
    }

    if (validationErrors === 0) {
      console.log('✅ All data validation checks passed!')
    } else {
      console.error(`❌ Found ${validationErrors} validation errors`)
    }

    return validationErrors === 0
  }
}

// CLI Interface
async function main() {
  const args = Deno.args
  const command = args[0] || 'seed'

  // In a real implementation, you would connect to your actual KV store
  const kv = createMockKVStore()
  const seeder = new DatabaseSeeder(kv)

  try {
    switch (command) {
      case 'seed':
        await seeder.seedAll()
        break
      case 'reset':
        await seeder.resetAndSeed()
        break
      case 'clear':
        await seeder.clearDatabase()
        break
      case 'validate':
        await seeder.validateData()
        break
      case 'summary':
        await seeder.printSummary()
        break
      default:
        console.log(
          'Usage: deno run seed-database.ts [seed|reset|clear|validate|summary]'
        )
        break
    }
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    Deno.exit(1)
  }
}

// Export for use in other scripts
export { DatabaseSeeder, SEED_DATA }

// Run if this is the main module
if (import.meta.main) {
  main()
}
