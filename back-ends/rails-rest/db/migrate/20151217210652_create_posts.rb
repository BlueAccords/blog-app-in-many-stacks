class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :url_path
      t.string :title
      t.string :body

      # Associations 
      t.index :user_id
      t.belongs_to :user, null: false

      t.timestamps null: false
    end
  end
end
