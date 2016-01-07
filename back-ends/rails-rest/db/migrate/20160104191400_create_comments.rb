class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :text

      # Associations 
      t.index :user_id
      t.belongs_to :user, null: false

      t.index :post_id
      t.belongs_to :post, null: false      

      t.timestamps null: false
    end
  end
end
