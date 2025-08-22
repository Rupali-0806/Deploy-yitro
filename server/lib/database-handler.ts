import { prisma } from "./prisma";
import {
  Contact,
  Account,
  ActivityLog,
  ActiveDeal,
  Lead,
  UserProfile,
  PaginatedResponse,
} from "@shared/models";

// In-memory storage as fallback
class InMemoryDatabase {
  private contacts: Contact[] = [];
  private accounts: Account[] = [];
  private activities: ActivityLog[] = [];
  private deals: ActiveDeal[] = [];
  private leads: Lead[] = [];
  private userProfiles: UserProfile[] = [];
  private initialized = false;

  async initialize() {
    if (this.initialized) return;
    
    console.log("📝 Initializing in-memory database with sample data...");
    
    // Sample accounts
    this.accounts = [
      {
        id: "acc1",
        accountName: "TechCorp Solutions",
        accountRating: "Gold (High Priority)",
        accountOwner: "Sales Rep 1",
        status: "Prospect",
        industry: "Technology",
        revenue: "$10M - $50M",
        numberOfEmployees: "100-500",
        addressLine1: "123 Tech Street",
        city: "New York",
        state: "NY",
        country: "USA",
        zipPostCode: "10001",
        timeZone: "EST",
        website: "https://techcorp.com",
        geo: "Americas",
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: "system",
        updatedBy: "system",
      },
      {
        id: "acc2",
        accountName: "Innovate Inc",
        accountRating: "Platinum (Must Have)",
        accountOwner: "Sales Rep 2",
        status: "Active Deal",
        industry: "Software",
        revenue: "$50M+",
        numberOfEmployees: "500+",
        addressLine1: "456 Innovation Ave",
        city: "San Francisco",
        state: "CA",
        country: "USA",
        zipPostCode: "94105",
        timeZone: "PST",
        website: "https://innovate.com",
        geo: "Americas",
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: "system",
        updatedBy: "system",
      },
    ];

    // Sample contacts
    this.contacts = [
      {
        id: "cnt1",
        firstName: "John",
        lastName: "Smith",
        title: "CEO",
        associatedAccount: "acc1",
        emailAddress: "john.smith@techcorp.com",
        deskPhone: "+1-555-0123",
        mobilePhone: "+1-555-0124",
        city: "New York",
        state: "NY",
        country: "USA",
        timeZone: "EST",
        source: "Data Research",
        owner: "Sales Rep 1",
        status: "Prospect",
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: "system",
        updatedBy: "system",
      },
      {
        id: "cnt2",
        firstName: "Jane",
        lastName: "Doe",
        title: "CTO",
        associatedAccount: "acc2",
        emailAddress: "jane.doe@innovate.com",
        deskPhone: "+1-555-0125",
        mobilePhone: "+1-555-0126",
        city: "San Francisco",
        state: "CA",
        country: "USA",
        timeZone: "PST",
        source: "Referral",
        owner: "Sales Rep 2",
        status: "Active Deal",
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: "system",
        updatedBy: "system",
      },
    ];

    // Sample deals
    this.deals = [
      {
        id: "deal1",
        dealName: "TechCorp Automation Project",
        dealOwner: "Sales Rep 1",
        businessLine: "Automation",
        associatedAccount: "acc1",
        associatedContact: "cnt1",
        dealValue: "150000",
        stage: "Proposal Submitted",
        probability: "75%",
        description: "Large automation project for TechCorp",
        geo: "Americas",
        entity: "Yitro Global",
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: "system",
        updatedBy: "system",
      },
      {
        id: "deal2",
        dealName: "Innovate Software Development",
        dealOwner: "Sales Rep 2",
        businessLine: "Product",
        associatedAccount: "acc2",
        associatedContact: "cnt2",
        dealValue: "250000",
        stage: "Negotiating",
        probability: "90%",
        description: "Custom software development for Innovate Inc",
        geo: "Americas",
        entity: "Yitro Tech",
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: "system",
        updatedBy: "system",
      },
    ];

    // Sample leads
    this.leads = [
      {
        id: "lead1",
        firstName: "Alice",
        lastName: "Johnson",
        company: "StartupCorp",
        title: "Founder",
        email: "alice@startupcorp.com",
        phone: "+1-555-0200",
        leadSource: "Website",
        status: "New",
        rating: "Hot",
        owner: "Sales Rep 1",
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: "system",
        updatedBy: "system",
      },
    ];

    // Sample activities
    this.activities = [
      {
        id: "act1",
        activityType: "Call",
        dateTime: new Date("2024-01-07T10:00:00Z"),
        summary: "Initial discovery call with TechCorp. Discussed automation needs.",
        outcomeDisposition: "Meeting Completed",
        associatedAccount: "acc1",
        associatedContact: "cnt1",
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: "system",
        updatedBy: "system",
      },
    ];

    this.initialized = true;
    console.log("✅ In-memory database initialized with sample data");
  }

  // Generic pagination helper
  private paginate<T>(items: T[], page: number, limit: number): PaginatedResponse<T> {
    const total = items.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    
    return {
      success: true,
      data: items.slice(start, end),
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  // Contacts
  async getContacts(page: number = 1, limit: number = 10, search?: string) {
    await this.initialize();
    let contacts = this.contacts;
    
    if (search) {
      contacts = contacts.filter(c => 
        c.firstName.toLowerCase().includes(search.toLowerCase()) ||
        c.lastName.toLowerCase().includes(search.toLowerCase()) ||
        c.emailAddress?.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    return this.paginate(contacts, page, limit);
  }

  async getContact(id: string) {
    await this.initialize();
    const contact = this.contacts.find(c => c.id === id);
    return contact ? { success: true, data: contact } : null;
  }

  async createContact(data: any) {
    await this.initialize();
    const newContact: Contact = {
      id: `cnt${Date.now()}`,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: "system",
      updatedBy: "system",
    };
    this.contacts.push(newContact);
    return { success: true, data: newContact, message: "Contact created successfully" };
  }

  async updateContact(id: string, data: any) {
    await this.initialize();
    const index = this.contacts.findIndex(c => c.id === id);
    if (index !== -1) {
      this.contacts[index] = { ...this.contacts[index], ...data, updatedAt: new Date() };
      return { success: true, data: this.contacts[index], message: "Contact updated successfully" };
    }
    return null;
  }

  async deleteContact(id: string) {
    await this.initialize();
    const index = this.contacts.findIndex(c => c.id === id);
    if (index !== -1) {
      this.contacts.splice(index, 1);
      return { success: true, message: "Contact deleted successfully" };
    }
    return null;
  }

  // Accounts
  async getAccounts(page: number = 1, limit: number = 10, search?: string) {
    await this.initialize();
    let accounts = this.accounts;
    
    if (search) {
      accounts = accounts.filter(a => 
        a.accountName.toLowerCase().includes(search.toLowerCase()) ||
        a.industry?.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    return this.paginate(accounts, page, limit);
  }

  async getAccount(id: string) {
    await this.initialize();
    const account = this.accounts.find(a => a.id === id);
    return account ? { success: true, data: account } : null;
  }

  // Similar methods for other entities...
  async getDeals(page: number = 1, limit: number = 10) {
    await this.initialize();
    return this.paginate(this.deals, page, limit);
  }

  async getLeads(page: number = 1, limit: number = 10) {
    await this.initialize();
    return this.paginate(this.leads, page, limit);
  }

  async getActivities(page: number = 1, limit: number = 10) {
    await this.initialize();
    return this.paginate(this.activities, page, limit);
  }
}

// Database handler with automatic fallback
export class DatabaseHandler {
  private inMemoryDb = new InMemoryDatabase();
  private isUsingFallback = false;

  private async checkDatabaseConnection(): Promise<boolean> {
    try {
      await prisma.$connect();
      await prisma.contact.count();
      return true;
    } catch (error) {
      console.warn("SQLite database connection failed, using in-memory fallback:", error.message);
      this.isUsingFallback = true;
      return false;
    }
  }

  async executeWithFallback<T>(
    prismaOperation: () => Promise<T>,
    fallbackOperation: () => Promise<T>
  ): Promise<T> {
    if (this.isUsingFallback) {
      return await fallbackOperation();
    }

    try {
      return await prismaOperation();
    } catch (error) {
      console.warn("Database operation failed, falling back to in-memory:", error.message);
      this.isUsingFallback = true;
      return await fallbackOperation();
    }
  }

  // Contacts
  async getContacts(page: number, limit: number, search?: string) {
    return this.executeWithFallback(
      async () => {
        const skip = (page - 1) * limit;
        const where = search ? {
          OR: [
            { firstName: { contains: search, mode: "insensitive" as const } },
            { lastName: { contains: search, mode: "insensitive" as const } },
            { emailAddress: { contains: search, mode: "insensitive" as const } },
          ],
        } : {};

        const [contacts, total] = await Promise.all([
          prisma.contact.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
          }),
          prisma.contact.count({ where }),
        ]);

        return {
          success: true,
          data: contacts.map((contact) => ({
            ...contact,
            source: contact.source?.replace(/_/g, " "),
            status: contact.status?.replace(/_/g, " "),
          })) as Contact[],
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        };
      },
      () => this.inMemoryDb.getContacts(page, limit, search)
    );
  }

  async getContact(id: string) {
    return this.executeWithFallback(
      async () => {
        const contact = await prisma.contact.findUnique({
          where: { id },
          include: { account: true, activities: true, deals: true },
        });
        
        if (!contact) return null;
        
        return {
          success: true,
          data: {
            ...contact,
            source: contact.source?.replace(/_/g, " "),
            status: contact.status?.replace(/_/g, " "),
          } as Contact,
        };
      },
      () => this.inMemoryDb.getContact(id)
    );
  }

  async createContact(data: any) {
    return this.executeWithFallback(
      async () => {
        const contact = await prisma.contact.create({
          data: {
            ...data,
            source: data.source ? data.source.replace(/\s+/g, "_").toUpperCase() : undefined,
            status: data.status ? data.status.replace(/\s+/g, "_").toUpperCase() : undefined,
            createdBy: "system",
            updatedBy: "system",
          } as any,
        });

        return {
          success: true,
          data: {
            ...contact,
            source: contact.source?.replace(/_/g, " "),
            status: contact.status?.replace(/_/g, " "),
          } as Contact,
          message: "Contact created successfully",
        };
      },
      () => this.inMemoryDb.createContact(data)
    );
  }

  // Similar methods for other entities...
  async getAccounts(page: number, limit: number, search?: string) {
    return this.executeWithFallback(
      async () => {
        const skip = (page - 1) * limit;
        const where = search ? {
          OR: [
            { accountName: { contains: search, mode: "insensitive" as const } },
            { industry: { contains: search, mode: "insensitive" as const } },
          ],
        } : {};

        const [accounts, total] = await Promise.all([
          prisma.account.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
          }),
          prisma.account.count({ where }),
        ]);

        return {
          success: true,
          data: accounts.map((account) => ({
            ...account,
            accountRating: account.accountRating?.replace(/_/g, " "),
            status: account.status?.replace("_", " "),
            geo: account.geo?.replace("_", " "),
          })) as Account[],
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        };
      },
      () => this.inMemoryDb.getAccounts(page, limit, search)
    );
  }

  async getDeals(page: number, limit: number) {
    return this.executeWithFallback(
      async () => {
        const skip = (page - 1) * limit;
        const [deals, total] = await Promise.all([
          prisma.activeDeal.findMany({
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
            include: { account: true, contact: true },
          }),
          prisma.activeDeal.count(),
        ]);

        return {
          success: true,
          data: deals.map((deal) => ({
            ...deal,
            businessLine: deal.businessLine?.replace(/_/g, " "),
            geo: deal.geo?.replace("_", " "),
            entity: deal.entity?.replace("_", " "),
            stage: deal.stage?.replace(/_/g, " "),
          })) as ActiveDeal[],
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        };
      },
      () => this.inMemoryDb.getDeals(page, limit)
    );
  }

  async getLeads(page: number, limit: number) {
    return this.executeWithFallback(
      async () => {
        const skip = (page - 1) * limit;
        const [leads, total] = await Promise.all([
          prisma.lead.findMany({
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
          }),
          prisma.lead.count(),
        ]);

        return {
          success: true,
          data: leads.map((lead) => ({
            ...lead,
            leadSource: lead.leadSource?.replace(/_/g, " "),
            status: lead.status?.replace("_", " "),
            rating: lead.rating?.replace("_", " "),
          })) as Lead[],
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        };
      },
      () => this.inMemoryDb.getLeads(page, limit)
    );
  }

  async getActivities(page: number, limit: number) {
    return this.executeWithFallback(
      async () => {
        const skip = (page - 1) * limit;
        const [activities, total] = await Promise.all([
          prisma.activityLog.findMany({
            skip,
            take: limit,
            orderBy: { dateTime: "desc" },
            include: { contact: true, account: true },
          }),
          prisma.activityLog.count(),
        ]);

        return {
          success: true,
          data: activities.map((activity) => ({
            ...activity,
            activityType: activity.activityType.replace("_", " "),
            outcomeDisposition: activity.outcomeDisposition?.replace(/_/g, " "),
          })) as ActivityLog[],
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        };
      },
      () => this.inMemoryDb.getActivities(page, limit)
    );
  }

  isUsingInMemoryFallback(): boolean {
    return this.isUsingFallback;
  }
}

export const dbHandler = new DatabaseHandler();
