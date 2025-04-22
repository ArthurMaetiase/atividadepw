module.exports = (sequelize, DataTypes) => {
    const Autor = sequelize.define("Autor", {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
         }
    })

    Autor.associate = (models) => {
        Autor.hasMany(models.Livro, {
            foreignKey: 'autorID',
            as: 'livro'
        })
    }
}