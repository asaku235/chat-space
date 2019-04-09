# README

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, add_index :users, :name, unique: true|

### Association
- has_many :messages
- has_many :groups through: :members

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, add_index :groups, :name, unique: true|

### Association
- has_many :messages
- has_many :users through: :members

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|content|text|null: false|
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|


### Association
- belongs_to :user
- belongs_to :group
