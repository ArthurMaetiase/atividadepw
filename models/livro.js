module.exports=(sequelize, DataTypes) => {
    const Livro = sequelize.define ("Livro", {
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tema: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })

    Livro.associate = (models) => {
        Livro.belongsTo(models.Autor, {
            foreignKey: 'autorId',
            as: 'Autor'
        })
    
    }

    return Livro
};