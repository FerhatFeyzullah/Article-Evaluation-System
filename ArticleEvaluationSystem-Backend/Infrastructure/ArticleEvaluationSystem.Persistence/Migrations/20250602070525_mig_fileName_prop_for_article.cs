using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArticleEvaluationSystem.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class mig_fileName_prop_for_article : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DosyaYolu",
                table: "Articles",
                newName: "FilePath");

            migrationBuilder.AddColumn<string>(
                name: "FileName",
                table: "Articles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileName",
                table: "Articles");

            migrationBuilder.RenameColumn(
                name: "FilePath",
                table: "Articles",
                newName: "DosyaYolu");
        }
    }
}
