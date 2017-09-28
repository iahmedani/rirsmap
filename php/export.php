<?php
$conn = new mysqli('192.168.16.7', '5N2W89reqpav', '%%8+Z_4+*_7C-wF','9y82C8f47x9b'); 
$table = "issuedetails"; 
$filename = "rirs_export"; 
$sql = "SELECT `number`, `priority`, `IssueCategoty`, `IssueSubCategoty`, `Description`, `Activity`, `CP`, `Province`, `District`, `Tehsil`, `UC`, `Location`, `PCode`, `ReportedBy`, `AssignedTo`, `lattitude`, `longitude`, `LastPersonResponded`, `Source`, `created`, `Updated`, `lastupdate`, `status` FROM $table";
$result = mysqli_query($conn,$sql) or die("Couldn't execute query:<br>" . mysqli_error(). "<br>" . mysqli_errno()); 
$file_ending = "xls";
header("Content-Type: application/xls");
header("Content-Disposition: attachment; filename=$filename.xls");
header("Pragma: no-cache"); 
header("Expires: 0");
$sep = "\t"; 
$names = mysqli_fetch_fields($result) ;
foreach($names as $name){
    print ($name->name . $sep);
    }
print("\n");
while($row = mysqli_fetch_row($result)) {
    $schema_insert = "";
    for($j=0; $j<mysqli_num_fields($result);$j++) {
        if(!isset($row[$j]))
            $schema_insert .= "NULL".$sep;
        elseif ($row[$j] != "")
            $schema_insert .= "$row[$j]".$sep;
        else
            $schema_insert .= "".$sep;
    }
    $schema_insert = str_replace($sep."$", "", $schema_insert);
    $schema_insert = preg_replace("/\r\n|\n\r|\n|\r/", " ", $schema_insert);
    $schema_insert .= "\t";
    print(trim($schema_insert));
    print "\n";
}
?>
