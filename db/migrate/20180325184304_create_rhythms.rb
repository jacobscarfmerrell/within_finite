class CreateRhythms < ActiveRecord::Migration[5.1]
  def change
    create_table :rhythms do |t|
      t.integer :antecedent, null: false
      t.integer :consequent, null: false
    end
  end
end
