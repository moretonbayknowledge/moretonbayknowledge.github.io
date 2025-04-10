with open("Metadata_library.txt", "r") as excel_file:
    lines = excel_file.readlines()
    lines = [line.rstrip() for line in lines]
    lines = [line.split("\t") for line in lines]

for i in range(0, len(lines)):
    for j in range(0, len(lines[0])):
        if i == 7 and j == 15:
            pass
        lines[i][j] = lines[i][j].replace("\n", "")
        if lines[i][j][0] == "\"":
            lines[i][j] = lines[i][j][1:len(lines[i][j])]
        if lines[i][j][len(lines[i][j]) - 1] == "\"":
            lines[i][j] = lines[i][j][0:(len(lines[i][j]) - 1)]
        lines[i][j] = lines[i][j].replace("\"", "")

with open("data.js", "w") as json_output:
    json_output.writelines("export var DataJson = `\n")
    json_output.writelines("{\n")


    for i in range(1, len(lines[0])):
        json_output.writelines(f"\"{lines[0][i]}\":\n")
        json_output.writelines("{\n")
        for j in range(1, len(lines)):
            if j == 1 and i == 15:
                pass
            if j == len(lines) - 1:
                json_output.writelines(f"\t\"{lines[j][0].split(" ", 1)[1]}\": \"{lines[j][i]}\"\n")
            else:
                json_output.writelines(f"\t\"{lines[j][0].split(" ", 1)[1]}\": \"{lines[j][i]}\",\n")

        if i == len(lines[0]) - 1:
            json_output.writelines("}\n")
        else:
            json_output.writelines("},\n")
    json_output.writelines("}\n")
    json_output.writelines("`;")



