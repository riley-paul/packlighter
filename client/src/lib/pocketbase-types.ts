/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	CategoriesGear = "categories_gear",
	Gear = "gear",
	ListCategories = "list_categories",
	Lists = "lists",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type CategoriesGearRecord = {
	gear: RecordIdString
	category: RecordIdString
	quantity?: number
	worn_weight?: boolean
	cons_weight?: boolean
}

export type GearRecord = {
	user: RecordIdString
	name?: string
	description?: string
	image_url?: string
	weight_g?: number
}

export type ListCategoriesRecord = {
	name?: string
	list: RecordIdString
}

export type ListsRecord = {
	user: RecordIdString
	name?: string
	description?: string
}

export type UsersRecord = {
	name?: string
	avatar?: string
	selected_list?: RecordIdString
}

// Response types include system fields and match responses from the PocketBase API
export type CategoriesGearResponse<Texpand = unknown> = Required<CategoriesGearRecord> & BaseSystemFields<Texpand>
export type GearResponse<Texpand = unknown> = Required<GearRecord> & BaseSystemFields<Texpand>
export type ListCategoriesResponse<Texpand = unknown> = Required<ListCategoriesRecord> & BaseSystemFields<Texpand>
export type ListsResponse<Texpand = unknown> = Required<ListsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	categories_gear: CategoriesGearRecord
	gear: GearRecord
	list_categories: ListCategoriesRecord
	lists: ListsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	categories_gear: CategoriesGearResponse
	gear: GearResponse
	list_categories: ListCategoriesResponse
	lists: ListsResponse
	users: UsersResponse
}