class CreateSections < ActiveRecord::Migration[5.1]
  def change
    create_table :sections do |t|
      t.integer :tempo, null: false, default: 90
      t.string :name, null: false
    end
  end
end
